import {APIRequest} from "vk-io";
import {get_id_from_message} from "../functions.js";

export const run = async (bot, context, id_user, args) => {
  const time = parseInt(args[1])
  if (isNaN(time) || time <= 0) return await context.reply("Укажите 2м аргументом время мута в минутах!")

  const params = {
    peer_id: context.peerId,
    member_ids: id_user,
    action: "ro",
    for: time * 60,
  }

  await bot.api.call('messages.changeConversationMemberRestrictions', params);

  await context.reply(`Вы успешно замутили ${args[0]} на ${time} минут!`)
}