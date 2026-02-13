import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

/* ---------- Types ---------- */

export interface BreadcrumbItemType {
  text: string;
  link?: string;
  icon?: any;
}

interface CustomBreadcrumbProps {
  items: BreadcrumbItemType[];
}

/* ---------- Component ---------- */

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = ({
  items,
}): JSXElement => {
    const navigate = useNavigate();
    
  return (
    <Breadcrumb aria-label="Application breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbButton
                onClick={() => item.link && navigate(item.link)}
                // href={item.link}
                icon={item.icon}
                current={isLast}
              >
                {item.text}
              </BreadcrumbButton>
            </BreadcrumbItem>

            {!isLast && <BreadcrumbDivider />}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
