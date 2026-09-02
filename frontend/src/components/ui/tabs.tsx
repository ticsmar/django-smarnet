import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type TabsVariant = "default" | "folder";

type TabsContextValue = {
  variant: TabsVariant;
  fill: boolean;
};

const TabsContext = React.createContext<TabsContextValue>({
  variant: "default",
  fill: false,
});

function useTabsVariant(override?: TabsVariant) {
  const ctx = React.useContext(TabsContext);
  return override ?? ctx.variant;
}

function useTabsFill() {
  return React.useContext(TabsContext).fill;
}

function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

const tabsListVariants = cva("items-center", {
  variants: {
    variant: {
      default:
        "inline-flex h-10 justify-center rounded-md bg-muted p-1 text-muted-foreground",
      folder:
        "flex h-auto min-h-11 w-full shrink-0 flex-nowrap items-stretch justify-start gap-1 overflow-x-auto overscroll-x-contain rounded-none bg-transparent px-1 pt-1 text-muted-foreground [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible",
    },
  },
  defaultVariants: { variant: "default" },
});

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-sm px-3 py-1.5 font-medium ring-offset-background focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        folder:
          "relative z-[1] min-h-9 shrink-0 rounded-t-lg border border-transparent bg-muted-foreground/30 px-3 py-2 text-left text-xs font-medium text-muted-foreground ring-inset hover:bg-muted-foreground/40 hover:text-foreground data-[state=active]:rounded-t-lg data-[state=active]:border-border/50 data-[state=active]:border-b-card data-[state=active]:bg-card data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:hover:bg-card sm:px-5 sm:text-sm",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const tabsContentVariants = cva(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=inactive]:hidden",
  {
    variants: {
      variant: {
        default: "mt-2 ring-offset-background focus-visible:ring-offset-2",
        folder:
          "mt-0 min-w-0 flex-1 rounded-b-2xl rounded-tr-2xl border-x border-b border-border/50 bg-card p-3 shadow-sm ring-inset data-[state=active]:flex data-[state=active]:min-h-0 data-[state=active]:flex-col sm:p-5",
      },
      fill: {
        true: "lg:min-h-0 lg:overflow-auto",
        false: "",
      },
    },
    defaultVariants: { variant: "default", fill: false },
  },
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  /**
   * Folder only. From `lg` up: panel fills leftover height; scroll only if
   * content overflows. Below `lg` the page grows and `main` scrolls.
   */
  fill?: boolean;
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant = "default", fill = false, ...props }, ref) => (
  <TabsContext.Provider value={{ variant, fill }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn(
        variant === "folder" &&
          "flex min-w-0 w-full flex-col overflow-visible bg-transparent shadow-none",
        fill && "lg:min-h-0 lg:flex-1",
        className,
      )}
      {...props}
    />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => {
  const resolved = useTabsVariant(variant ?? undefined);
  const list = (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant: resolved }), className)}
      {...props}
    />
  );
  if (resolved !== "folder") return list;
  return (
    <div className="shrink-0 max-lg:sticky max-lg:top-0 max-lg:z-10 max-lg:bg-surface-container-low">
      {list}
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => {
  const resolved = useTabsVariant(variant ?? undefined);
  const localRef = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    if (resolved !== "folder") return;
    const node = localRef.current;
    if (!node) return;
    const intoView = () => {
      if (node.getAttribute("data-state") !== "active") return;
      const list = node.closest('[role="tablist"]');
      if (!(list instanceof HTMLElement)) return;
      const tabBox = node.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      if (tabBox.left < listBox.left) {
        list.scrollLeft += tabBox.left - listBox.left - 8;
      } else if (tabBox.right > listBox.right) {
        list.scrollLeft += tabBox.right - listBox.right + 8;
      }
    };
    intoView();
    const observer = new MutationObserver(intoView);
    observer.observe(node, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, [resolved]);

  return (
    <TabsPrimitive.Trigger
      ref={mergeRefs(localRef, ref)}
      className={cn(tabsTriggerVariants({ variant: resolved }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, fill, ...props }, ref) => {
  const resolved = useTabsVariant(variant ?? undefined);
  const fillFromCtx = useTabsFill();
  const fillResolved = fill ?? fillFromCtx;
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        tabsContentVariants({
          variant: resolved,
          fill: fillResolved && resolved === "folder" ? true : false,
        }),
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
