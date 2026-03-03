// Bunny / Vendetta compatible simple plugin

export default {
  onLoad() {
    try {
      const metro = globalThis.vendetta.metro;
      const patcher = globalThis.vendetta.patcher;
      const React = globalThis.vendetta.metro.common.React;
      const ui = globalThis.vendetta.ui;

      const MessageActions = metro.findByProps("sendMessage");
      const ChatInput = metro.findByProps("ChatInput");

      this.unpatch = patcher.after("default", ChatInput, (_, res) => {
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
              style: {
                marginRight: 8,
                padding: 8
              }
            },
            React.createElement("Text", null, "Hi")
          );

          children.unshift(button);
        } catch (e) {
          console.log(e);
        }

        return res;
      });

    } catch (e) {
      console.log("Plugin load error:", e);
    }
  },

  onUnload() {
    this.unpatch?.();
  }
};
