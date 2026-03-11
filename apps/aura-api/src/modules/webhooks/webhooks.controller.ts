import { Controller, Get, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
    constructor(private readonly webhooksService: WebhooksService) { }

    @Get('instagram')
    async verifyInstagramWebhook(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
        @Res() res: Response
    ) {
        try {
            const returnedChallenge = await this.webhooksService.verifyWebhook(mode, token, challenge);
            res.status(HttpStatus.OK).send(returnedChallenge);
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).send('Forbidden');
        }
    }

    @Post('instagram')
    async handleInstagramWebhook(@Body() body: any, @Res() res: Response) {
        await this.webhooksService.handleWebhookEvent(body);
        // Instagram requires a 200 OK back within 20 seconds, regardless of whether processing completes.
        res.status(HttpStatus.OK).send('EVENT_RECEIVED');
    }
}
