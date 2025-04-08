import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";


//TODO: Implement filter functionality
//Filter by location
//Filter by Team
//Filter by search?

/*Ide store the alumni array/data in the redux store and use that to filter on the location prop and team prop?*/
/*Ide 2 send req to db and filter on Backend, seem like a little bit overkill? */

export function AlumniFilter() {
    return (

        /*Filter component for smaller screens*/
        /*TODO: Implement a filter component for smaller screens*/

        /*Filter component for larger screens*/
        <div className="hidden flex-row justify-between items-center gap-2 md:flex ">
            <Input placeholder="Search by name, title, description" />

            {/*TODO: Filter by location dropdown*/}
            <DropdownMenu>
                <DropdownMenuTrigger className=" flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center">
                    <div className="flex flex-row w-full justify-between items-center">
                        <span>All locations</span>
                        <span><MdKeyboardArrowDown/></span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem>Stockholm</DropdownMenuItem>
                    <DropdownMenuItem>Linköping</DropdownMenuItem>
                    <DropdownMenuItem>Göteborg</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/*TODO: Filter by team dropdown*/}
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center">
                    <div className="flex flex-row w-full justify-between items-center">
                        <span>All Teams</span>
                        <span><MdKeyboardArrowDown/></span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem>Business Team</DropdownMenuItem>
                    <DropdownMenuItem>AI Team</DropdownMenuItem>
                    <DropdownMenuItem>IT Team</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
