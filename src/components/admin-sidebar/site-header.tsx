import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({ path }: { path: string }) {
  // Parse the path to create breadcrumbs
  const pathSegments = path.split("/").filter(Boolean);

  // Create breadcrumb links with accumulated paths
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { segment, url };
  });

  return (
    <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <nav className='flex items-center'>
          <ol className='flex items-center '>
            {breadcrumbs.map((crumb, index) => (
              <li
                key={crumb.url}
                className='flex items-center hover:opacity-90 transition-opacity'
              >
                {index > 0 && (
                  <span className='mx-2 text-muted-foreground'>/</span>
                )}
                <Link
                  href={crumb.url}
                  className='flex items-center hover:opacity-90 transition-opacity'
                >
                  {crumb.segment === "admin" ? (
                    <span className='text-base'>Home</span>
                  ) : (
                    <span className='text-base'>{crumb.segment}</span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
