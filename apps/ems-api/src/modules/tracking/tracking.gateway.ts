import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';

@WebSocketGateway({ cors: true })
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private trackingService: TrackingService) { }

  handleConnection(client: Socket) {
    // Basic connection handling. In a real scenario, you'd extract JWT token here to authenticate.
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping_activity')
  async handleActivityPing(client: Socket, payload: { sessionId: number; userId: number; route: string; timeSpentSeconds: number; idleTimeSeconds: number }) {
    // Record page activity ping from the frontend
    const activity = await this.trackingService.logActivity(
      payload.sessionId,
      payload.userId,
      payload.route,
      payload.timeSpentSeconds,
      payload.idleTimeSeconds
    );

    // Optionally return an acknowledgment
    return { status: 'success', recordedActivityId: activity.id };
  }
}
