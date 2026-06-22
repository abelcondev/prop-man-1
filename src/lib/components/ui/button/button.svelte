<script lang="ts">
	import { cn } from '$lib/utils/cn.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface BaseProps {
		class?: string;
		variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		children: Snippet;
	}

	interface ButtonProps extends BaseProps, Omit<HTMLButtonAttributes, 'class' | 'children'> {
		href?: undefined;
	}

	interface AnchorProps extends BaseProps, Omit<HTMLAnchorAttributes, 'class' | 'children'> {
		href: string;
	}

	let {
		class: className,
		variant = 'default',
		size = 'default',
		children,
		...rest
	}: ButtonProps | AnchorProps = $props();

	const base =
		'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50';

	const variants = {
		default: 'bg-primary text-white hover:bg-primary/90',
		secondary: 'bg-surface text-text hover:bg-surface/80',
		destructive: 'bg-error text-white hover:bg-error/90',
		outline: 'border border-text-secondary/20 bg-background hover:bg-surface',
		ghost: 'hover:bg-surface'
	};

	const sizes = {
		default: 'h-10 px-4 py-2 text-sm',
		sm: 'h-8 px-3 text-xs',
		lg: 'h-12 px-6 text-base',
		icon: 'h-10 w-10'
	};
</script>

{#if 'href' in rest && rest.href}
	<a class={cn(base, variants[variant], sizes[size], className)} {...rest as AnchorProps}>
		{@render children()}
	</a>
{:else}
	<button class={cn(base, variants[variant], sizes[size], className)} {...rest as ButtonProps}>
		{@render children()}
	</button>
{/if}
