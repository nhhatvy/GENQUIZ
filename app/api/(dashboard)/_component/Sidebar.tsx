"use client";
import { clsx } from 'clsx';
import { Building2, ChartNoAxesGantt, ChevronDown, ChevronRight, Factory, FileUser, IdCardLanyard, LayoutDashboard, MapPin, Menu, Package, PackageSearch, Settings2, ShoppingCart, Store, Warehouse } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Menu_items = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/home"
    },
    {
        title: "System",
        icon: Store,
        children: [
            {
                title: "Store", href: "/store", icon: Store
            },
            {
                title: "Company", href: "/company", icon: Building2
            },
            {
                title: "Branch", href: "/branch", icon: MapPin
            }
        ]
    },
    {
        title: "Sales",
        icon: ShoppingCart,
        children: [
            {
                title: "Orders", href: "/dashboard/orders", icon: ShoppingCart
            },
            {
                title: "Customers", href: "/dashboard/customers", icon: FileUser
            }
        ]
    },
    {
        title: "Catalog",
        icon: Package,
        children: [
            {
                title: "Products", href: "/dashboard/products", icon: PackageSearch
            },
            {
                title: "Categories", href: "/dashboard/categories", icon: ChartNoAxesGantt
            },
            {
                title: "Manufacturers", href: "/dashboard/manufacturers", icon: Factory
            }
        ]
    },
    {
        title: "Inventory",
        icon: Warehouse,
        children: [
            {
                title: "Warehouses", href: "/dashboard/warehouses", icon: Warehouse
            },
            {
                title: "GoodsReceipt", href: "/goodsreciept", icon: Package
            },
            {
                title: "DeliveryReceipt", href: "/deliveryreceipt", icon: Package
            },
            {
                title: "Suppliers", href: "/dashboard/suppliers", icon: Building2
            }
        ]
    },
    {
        title: "HRM",
        icon: IdCardLanyard,
        children: [
            {
                title: "Employees", href: "/dashboard/employees", icon: IdCardLanyard
            },
            {
                title: "PayRoll", href: "/dashboard/payroll", icon: IdCardLanyard
            }
        ]
    },
    {
        title: "Settings",
        icon: Settings2,
        href: "/dashboard/settings",

    }

]


export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const pathname = usePathname();
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        if (!isCollapsed) setOpenSubMenu(null);
    };
    const toggleSubMenu = (title: string) => {
        if (isCollapsed) {
            setIsCollapsed(false);
            setOpenSubMenu(title);
        }
        else {
            setOpenSubMenu(openSubMenu === title ? null : title);
        }
    };

    return (
        <aside
            className={clsx('bg-blue-950 text-white flex flex-col h-screen transition-all duration-300 sticky top-0', isCollapsed ? "w-16" : "w-64")}
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-700 h-14">

                {!isCollapsed && <span className="text-xl font-bold whitespace-nowrap">Menu</span>}
                <button
                    onClick={toggleSidebar}
                    className="p-1 rounded hover:bg-slate-700 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="flex-1 p-2 space-y-1 mt-2 overflow-y-auto">
                {Menu_items.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isSubMenuOpen = openSubMenu === item.title;
                    const isChildActive = item.children?.some(child => pathname === child.href);

                    return (
                        <div key={index}>
                            {item.children ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubMenu(item.title)}
                                        className={clsx('w-full flex items-center justify-between p-3 rounded transition-colors overflow-hidden', (isSubMenuOpen || isChildActive) ? 'bg-blue-900' : 'hover:bg-slate-800')}
                                        title={item.title}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Icon size={20} className="shrink-0" />
                                            <span className={clsx('whitespace-nowrap transition-opacity duration-200', isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                                                {item.title}
                                            </span>
                                        </div>
                                        {!isCollapsed && (
                                            <div className="shrink-0">
                                                {isSubMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </div>
                                        )}
                                    </button>

                                    <div className={clsx('overflow-hidden transition-all duration-300 ease-in-out', isSubMenuOpen && !isCollapsed ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0')}>
                                        <div className="ml-4 mt-1 space-y-1 border-l border-slate-600 pl-2">
                                            {item.children.map((child, childIndex) => (
                                                <Link
                                                    key={childIndex}
                                                    href={child.href}
                                                    className={clsx('flex items-center gap-3 p-2 rounded text-sm transition-colors', pathname === child.href ? 'text-slate-300 font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800')}>
                                                    <child.icon size={16} />
                                                    <span>{child.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <Link
                                    href={item.href || '#'}
                                    className={clsx('flex items-center gap-4 p-3 rounded transition-colors overflow-hidden', isActive ? 'bg-blue-900' : 'hover:bg-slate-800')}
                                    title={item.title}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    <span className={clsx('whitespace-nowrap transition-opacity duration-200', isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                                        {item.title}
                                    </span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}