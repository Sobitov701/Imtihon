import { buttonVariants } from "./ui/button";

export default function StatusBadge({ status = "draft" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgba(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[#33D69f]",
      text: "text-[#33D69f]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dote: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255, 143, 0, 0.05)",
    },
  };

  const currentStyle = style[status?.toLowerCase()] || style["draft"];

  return (
    <span
      className={`${buttonVariants({
        variant: "outline",
      })} min-w-[104px] border-none flex items-center gap-2 justify-center py-1 px-2 rounded-md`}
      style={{
        backgroundColor: currentStyle.bg,
      }}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${currentStyle.dote}`}
      ></span>
      <span className={`capitalize ${currentStyle.text}`}>{status}</span>
    </span>
  );
}
