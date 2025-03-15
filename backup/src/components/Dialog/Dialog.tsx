import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as S from './Dialog.styles';

import { Cross1Icon } from '@radix-ui/react-icons';
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { theme } from 'styles/theme';

export type DialogRootProps = DialogPrimitive.DialogProps;

export type DialogTriggerProps = DialogPrimitive.DialogTriggerProps;

export type DialogPortalProps = DialogPrimitive.DialogPortalProps;

export type DialogOverlayProps = DialogPrimitive.DialogOverlayProps;

export type DialogContentProps = {
	size?: 'small' | 'large';
} & DialogPrimitive.DialogContentProps;

export type DialogHeaderProps = {
	children?: ReactNode;
};

export type DialogTitleProps = DialogPrimitive.DialogTitleProps;

export type DialogDescriptionProps = DialogPrimitive.DialogDescriptionProps;

export type DialogFooterProps = {
	align?: 'left' | 'right';
} & HTMLAttributes<HTMLDivElement>;

export type DialogCloseProps = DialogPrimitive.DialogCloseProps;

const DialogOverlay = forwardRef(
	(props: DialogOverlayProps, ref: ForwardedRef<HTMLDivElement>) => (
		<S.DialogOverlay ref={ref} {...props} />
	),
);

DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = ({ ...props }: DialogContentProps) => (
	<S.DialogContent>
		<DialogPrimitive.Content {...props} />
	</S.DialogContent>
);

const DialogDescription = ({ children }: DialogDescriptionProps) => (
	<S.DialogDescription>{children}</S.DialogDescription>
);

const DialogHeader = ({ children }: DialogHeaderProps) => (
	<S.DialogHeader>
		{children}
		<S.DialogHeaderCross>
			<DialogPrimitive.Close asChild>
				<Cross1Icon width={24} height={24} color={theme.colors.darkGrey} />
			</DialogPrimitive.Close>
		</S.DialogHeaderCross>
	</S.DialogHeader>
);

const DialogFooter = ({ align = 'right', ...props }: DialogFooterProps) => (
	<S.DialogFooter $align={align} {...props} />
);

export const Dialog = {
	Root: DialogPrimitive.Root,
	Trigger: DialogPrimitive.Trigger,
	Portal: DialogPrimitive.Portal,
	Overlay: DialogOverlay,
	Content: DialogContent,
	Header: DialogHeader,
	Title: DialogPrimitive.Title,
	Description: DialogDescription,
	Footer: DialogFooter,
	Close: DialogPrimitive.Close,
};
