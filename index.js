// ==UserPlugin==
// @name HelloButton
// @description Test send button
// @author You
// ==/UserPlugin==

(function() {
  const metro = globalThis.vendetta?.metro || globalThis.bunny?.metro;
  const patcher = globalThis.vendetta?.patcher || globalThis.bunny?.patcher;
  const React = metro.common.React;
  const ui = globalThis.vendetta?.ui || globalThis.bunny?.ui;
  const MessageActions = metro.findByProps("sendMessage");
  const ChatInput = metro.findByProps("ChatInput");

  let unpatch;

  function load() {
    unpatch = patcher.after("default", ChatInput, (_, res) => {
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
  }

  function unload() {
    unpatch?.();
  }

  load();
  globalThis.helloButtonUnload = unload;
})();
