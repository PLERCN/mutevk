import {APIRequest} from "vk-io";
import {get_id_from_message} from "../functions.js";

export const run = async (bot, context, id_user, args) => {
  const params = {
    peer_id: context.peerId,
    member_ids: id_user,
    action: "rw",
  }

  await bot.api.call('messages.changeConversationMemberRestrictions', params);

  await context.reply(`Вы успешно размутили ${args[0]}`)
}