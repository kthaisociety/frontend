import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";


//TODO: Implement filter functionality
//Filter by location
//Filter by Team
//Filter by search?

/*Ide store the alumni array/data in the redux store and use that to filter on the location prop and team prop?*/
/*Ide 2 send req to db and filter on Backend, seem like a little bit overkill? */

export function AlumniFilter( {handleTeamChange}: {handleTeamChange: (team: string) => void}) {
    return (

        /*Filter component for larger screens*/
        <div className="flex flex-row justify-end items-center gap-2">

            {/*TODO: Filter by team dropdown*/}
            <DropdownMenu>
                <DropdownMenuTrigger className="flex w-1/6  rounded-md border px-3 py-1 shadow-sm items-center text-sm md:text-l">
                    <div className="flex flex-row w-full justify-center sm:justify-between items-center overflow-hidden">
                        <div className="flex flex-row items-center gap-1 ">
                            <span className="hidden sm:block">Select</span>
                            <span className="hidden md:block">Teams</span>
                        </div>
                        <span><MdKeyboardArrowDown/></span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] text-xs">
                    <DropdownMenuItem onClick={() => handleTeamChange("Business Team")}>Business Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTeamChange("AI Team")}>AI Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTeamChange("IT Team")}>IT Team</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTeamChange("All Team")}>All Team</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
