import { ReactNode } from "react";
import cn from "classnames";
import "./styles.scss";

type Props = {
	className?: string;
	children?: ReactNode;
};

const Container = ({ children, className }: Props) => {
	return <div className={cn("container", className)}>{children}</div>;
};

export { Container };
