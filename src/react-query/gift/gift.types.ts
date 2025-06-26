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

export enum GiftStatus {
  Pending = "Pending",
  Redeemed = "Redeemed",
  Revoked = "Revoked",
}

export interface SentGiftVm {
  id: string;
  receiverEmail: string;
  giftName: string;
  giftImageUrl?: string;
  status: GiftStatus;
  redeemedAt?: string;
  revokedAt?: string;
  createdAt: string;
}

export interface ReceivedGiftVm {
  id: string;
  giverName: string;
  giftName: string;
  giftImageUrl?: string;
  status: GiftStatus;
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
