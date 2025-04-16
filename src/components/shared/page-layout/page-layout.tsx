import cn from "classnames";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
	return (
		<div className={cn("page-layout")}>
			<main className="page-layout__content">{children}</main>
		</div>
	);
};

export { PageLayout };
