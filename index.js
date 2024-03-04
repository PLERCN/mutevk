import * as dotenv from 'dotenv';
import {VK} from "vk-io";
import {get_id_from_message} from "./functions.js";

dotenv.config({path: './config.env'})

const bot = new VK(({
  token: `${process.env.MAIN_TOKEN}`,
}))

bot.updates.on("message", async context => {
  if (context.isOutbox) return

  if (context.text.startsWith("/")) {
    const split_text = context.text.split(" ")

    const command = split_text[0].slice(1)
    const args = split_text.slice(1)

    const id_user = await get_id_from_message(args[0])
    if (!id_user) return await context.reply("Укажите 1м аргументом пользователя!")

    try {
      const dir = `./commands/${command}.js`
      const file = await import(dir)
      await file.run(bot, context, id_user, args)
    } catch (e) {
      console.log(e)
    }
  }
})

await bot.updates.start()