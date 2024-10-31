import React from "react";
import {
  Provider,
  Root,
  Trigger,
  Content,
  Arrow,
  TooltipProps,
} from "@radix-ui/react-tooltip";

export default function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipProps & { content: string | React.ReactNode }) {
  return (
    <Provider>
      <Root
        delayDuration={300}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <Trigger asChild>{children}</Trigger>

        <Content
          side="top"
          align="center"
          sideOffset={5}
          className="select-none z-10 rounded-[4px] border bg-[#121312] px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
          {...props}
        >
          {content}
          <Arrow className="fill-white" width={11} height={5} />
        </Content>
      </Root>
    </Provider>
  );
}
