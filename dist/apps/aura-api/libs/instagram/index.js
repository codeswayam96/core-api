"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInstagramMessage = sendInstagramMessage;
exports.sendInstagramCommentReply = sendInstagramCommentReply;
const axios_1 = require("axios");
async function sendInstagramMessage(accessToken, recipientId, text, pageId) {
    var _a;
    try {
        const accountId = pageId || 'me';
        const url = `https://graph.facebook.com/v21.0/${accountId}/messages`;
        console.log(`Sending Instagram message to ${recipientId} via Page ${accountId}`);
        const response = await axios_1.default.post(url, {
            recipient: { id: recipientId },
            message: { text: text }
        }, {
            params: { access_token: accessToken }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error sending Instagram message:', ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw error;
    }
}
async function sendInstagramCommentReply(accessToken, commentId, text) {
    try {
        const url = `https://graph.facebook.com/v21.0/${commentId}/replies`;
        const response = await axios_1.default.post(url, {
            message: text
        }, {
            params: { access_token: accessToken }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error sending Instagram comment reply:', error);
        throw error;
    }
}
//# sourceMappingURL=index.js.map