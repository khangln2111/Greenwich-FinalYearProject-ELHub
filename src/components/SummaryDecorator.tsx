import React from "react";
import clsx from "clsx";

type SummaryDecoratorProps = React.HTMLAttributes<HTMLDivElement> & {
  height?: number | string;
  backgroundColor?: string;
};

const SummaryDecorator: React.FC<SummaryDecoratorProps> = ({
  height = 24,
  backgroundColor = "white",
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={clsx(className)}
      style={{
        height,
        background: backgroundColor,
        mask: `radial-gradient(11.52px at 50% calc(100% - 15.45px), rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%) calc(50% - 20.6px) 0px / 41.2px 100%,
               radial-gradient(11.52px at 50% calc(100% + 5.15px), rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%) 50% calc(100% - 10.3px) / 41.2px 100% repeat-x`,
        WebkitMask: `radial-gradient(11.52px at 50% calc(100% - 15.45px), rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%) calc(50% - 20.6px) 0px / 41.2px 100%,
                     radial-gradient(11.52px at 50% calc(100% + 5.15px), rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%) 50% calc(100% - 10.3px) / 41.2px 100% repeat-x`,
        ...style,
      }}
      {...rest}
    />
  );
};

export default SummaryDecorator;
