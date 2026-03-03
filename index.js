export default {
  onLoad() {
    const metro = globalThis.bunny?.metro ?? globalThis.vendetta?.metro;
    const patcher = globalThis.bunny?.patcher ?? globalThis.vendetta?.patcher;
    const React = metro?.common?.React;
    const ui = globalThis.bunny?.ui ?? globalThis.vendetta?.ui;

    if (!metro || !patcher || !React || !ui) {
      console.log("HelloButton: Bunny/Vendetta API not found");
      return;
    }

    const MessageActions = metro.findByProps("sendMessage");
    const ChatInput = metro.findByProps("ChatInput");

    this.unpatch = patcher.after("default", ChatInput, (_, res) => {
      try {
        const children = res?.props?.children;
        if (!Array.isArray(children)) return res;

        const btn = React.createElement(
          "TouchableOpacity",
          {
            onPress: () => {
              const channelId = ui.getChannelId();
              MessageActions.sendMessage(channelId, { content: "привет как дела" });
            },
            style: { marginRight: 8, padding: 8 }
          },
          React.createElement("Text", null, "Hi")
        );

        // слева от отправки
        children.unshift(btn);
      } catch (e) {
        console.log("HelloButton error:", e);
      }
      return res;
    });
  },

  onUnload() {
    this.unpatch?.();
  }
};
