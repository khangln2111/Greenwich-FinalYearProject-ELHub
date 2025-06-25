export interface GiftVm {
  id: string;
  receiverEmail: string;
  giverName: string;
  inventoryItemName: string;
  inventoryItemImageUrl?: string;
  status: "Pending" | "Redeemed" | "Revoked";
  redeemedAt?: string;
  revokedAt?: string;
  createdAt: string;
}

export interface CreateGiftCommand {
  receiverEmail: string;
  InventoryItemId: string;
}

export interface ChangeGiftReceiverCommand {
  id: string;
  receiverEmail: string;
}
