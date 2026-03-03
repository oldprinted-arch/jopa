import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";
import { getChannelId } from "@vendetta/ui";

const MessageActions = findByProps("sendMessage");
const ChatInput = findByProps("ChatInput");

let unpatch;

export default {
  onLoad() {
    unpatch = after("default", ChatInput, (_, res) => {
      try {
        const children = res?.props?.children;
        if (!Array.isArray(children)) return res;

        const button = React.createElement(
          "TouchableOpacity",
          {
            onPress: () => {
              const channelId = getChannelId();
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
  },

  onUnload() {
    unpatch?.();
  }
};
