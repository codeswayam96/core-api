import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'meeting' })
export class MeetingsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // room -> Set of socketIds
  private activeRooms = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    console.log(`User connected to meeting namespace: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected from meeting namespace: ${client.id}`);
    this.removeUserFromAllRooms(client.id);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string, userId: number }) {
    const { roomId, userId } = data;
    client.join(roomId);

    if (!this.activeRooms.has(roomId)) {
      this.activeRooms.set(roomId, new Set());
    }
    this.activeRooms.get(roomId).add(client.id);

    // Notify others in the room
    client.to(roomId).emit('user-joined', { socketId: client.id, userId });

    return { status: 'joined', roomId, socketId: client.id };
  }

  @SubscribeMessage('offer')
  handleOffer(@ConnectedSocket() client: Socket, @MessageBody() data: { targetSocketId: string, offer: any }) {
    client.to(data.targetSocketId).emit('offer', {
      socketId: client.id,
      offer: data.offer,
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: { targetSocketId: string, answer: any }) {
    client.to(data.targetSocketId).emit('answer', {
      socketId: client.id,
      answer: data.answer,
    });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@ConnectedSocket() client: Socket, @MessageBody() data: { targetSocketId: string, candidate: any }) {
    client.to(data.targetSocketId).emit('ice-candidate', {
      socketId: client.id,
      candidate: data.candidate,
    });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    const { roomId } = data;
    client.leave(roomId);
    this.removeUserFromRoom(client.id, roomId);
    client.to(roomId).emit('user-left', { socketId: client.id });
  }

  private removeUserFromRoom(socketId: string, roomId: string) {
    const room = this.activeRooms.get(roomId);
    if (room) {
      room.delete(socketId);
      if (room.size === 0) {
        this.activeRooms.delete(roomId);
      }
    }
  }

  private removeUserFromAllRooms(socketId: string) {
    for (const [roomId, users] of this.activeRooms.entries()) {
      if (users.has(socketId)) {
        users.delete(socketId);
        this.server.to(roomId).emit('user-left', { socketId });
        if (users.size === 0) {
          this.activeRooms.delete(roomId);
        }
      }
    }
  }
}
