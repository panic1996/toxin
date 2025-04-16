import cn from "classnames";
import { ReactNode } from "react";
import "./styles.scss";

type Variant = "h1" | "h2" | "h3" | "p";
type Props = {
	variant?: Variant;
	isSemantic?: boolean;
	className?: string;
	children: ReactNode;
};

const Typography = ({
	children,
	className,
	variant = "p",
	isSemantic = false,
}: Props) => {
	const Tag = isSemantic ? variant : "p";
	return (
		<Tag
			className={cn(
				"typography",
				`typography--variant-${variant}`,
				className
			)}
		>
			{children}
		</Tag>
	);
};

export { Typography };
