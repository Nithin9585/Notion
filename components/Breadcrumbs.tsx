"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean); // Remove empty segments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, idx) => {
          const href = `/${segments.slice(0, idx + 1).join("/")}`;
          const islast = idx === segments.length -1;
          return (
            <Fragment key={segment}>
                <BreadcrumbSeparator/>
              <BreadcrumbItem>
              {islast? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ):(
                <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>

              )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
