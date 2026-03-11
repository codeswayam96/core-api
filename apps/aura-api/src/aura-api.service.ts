import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuraApiService {
  constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

  getHello(): string {
    return 'Welcome to Aura API!';
  }

  async getUserProfile(userId: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
      with: {
        // Need to link afIntegrations and afSubscriptions down the road
        // Since Drizzle relations for aura-flow are not yet globally defined 
        // inside usersRelations, we'll fetch them manually for simplicity.
      }
    });

    if (!user) throw new NotFoundException('User not found');

    const subscription = await this.db.query.afSubscriptions.findFirst({
      where: eq(schema.afSubscriptions.userId, userId)
    });

    const integrations = await this.db.query.afIntegrations.findMany({
      where: eq(schema.afIntegrations.userId, userId),
      columns: {
        id: true,
        token: true,
        expiresAt: true,
        name: true,
        instagramId: true,
        pageId: true
      }
    });

    return {
      ...user,
      subscription,
      integrations
    };
  }
}
