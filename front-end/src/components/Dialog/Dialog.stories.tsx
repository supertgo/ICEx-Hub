import type { Meta, StoryFn } from '@storybook/react';

import { Dialog } from './Dialog';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

export default {
	title: 'components/Dialog',
	component: Dialog.Root,
	tags: ['autodocs'],
} as Meta;

export const Default: StoryFn = () => {
	return (
		<Dialog.Root open={true} onOpenChange={() => ({})}>
			<Dialog.Trigger asChild>
				<Button>Open Dialog</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay>
					<Dialog.Content size="large">
						<Dialog.Header>
							<Dialog.Title>Adicionar Formação Acadêmica</Dialog.Title>
						</Dialog.Header>

						<Dialog.Description>
							<Input placeholder="Nome da empresa" />
							<Input placeholder="Nome da empresa" />
							<Input placeholder="Nome da empresa" />
							<Input placeholder="Nome da empresa" />
							<Input placeholder="Nome da empresa" />
						</Dialog.Description>

						<Dialog.Footer>
							<Dialog.Close asChild>
								<Button>Cancelar</Button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Button>Salvar</Button>
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
