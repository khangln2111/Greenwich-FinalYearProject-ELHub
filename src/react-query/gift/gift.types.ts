export interface GiftVm {
  id: string;
  receiverEmail: string;
  giverName: string;
  giftName: string;
  giftImageUrl?: string;
  status: "Pending" | "Redeemed" | "Revoked";
  redeemedAt?: string;
  revokedAt?: string;
  createdAt: string;
}

export interface CreateGiftCommand {
  receiverEmail: string;
  inventoryItemId: string;
}

export interface ChangeGiftReceiverCommand {
  id: string;
  receiverEmail: string;
}
