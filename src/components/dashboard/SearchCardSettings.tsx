import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IconDots } from "@tabler/icons-react";
import { add } from "@/lib/actions/controls";

export default function SearchCardSettings({ uri }: { uri: string }) {
  const handleAddToQueue = async () => {
    add(uri);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-neutral-200 p-1 rounded-full absolute right-3 top-1/2 transform -translate-y-1/2">
        <IconDots className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleAddToQueue}>
          Add to Queue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
