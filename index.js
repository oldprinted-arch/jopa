// ==UserPlugin==
// @name HelloButton
// @description Добавляет кнопку рядом с отправкой сообщений
// @author You
// ==/UserPlugin==

(function() {
  try {
    const metro = globalThis.vendetta?.metro || globalThis.bunny?.metro;
    const patcher = globalThis.vendetta?.patcher || globalThis.bunny?.patcher;
    const React = metro.common.React;
    const ui = globalThis.vendetta?.ui || globalThis.bunny?.ui;

    const MessageActions = metro.findByProps("sendMessage");
    const ChatInput = metro.findByProps("ChatInput");

    let unpatch = patcher.after("default", ChatInput, (_, res) => {
      try {
        const children = res?.props?.children;
        if (!Array.isArray(children)) return res;

        const button = React.createElement(
          "TouchableOpacity",
          {
            onPress: () => {
              const channelId = ui.getChannelId();
              MessageActions.sendMessage(channelId, {
                content: "привет как дела"
              });
            },
            style: { marginRight: 8, padding: 8 }
          },
          React.createElement("Text", null, "Hi")
        );

        children.unshift(button);
      } catch (e) { console.log(e); }

      return res;
    });

    // Экспорт на выгрузку
    globalThis.helloButtonUnload = () => {
      unpatch?.();
    };
  } catch(e) { console.log("Plugin error:", e); }
})();
