import { Button, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { GemIcon } from "lucide-react";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";
import AppPagination from "../../../components/AppPagination/AppPagination";
import {
  useChangeGiftReceiver,
  useGetReceivedGifts,
  useGetSentGifts,
  useRedeemGift,
  useRevokeGift,
} from "../../../features/gift/gift.hooks";
import { usePageSEO } from "../../../hooks/usePageSEO";
import { ChangeGiftReceiverModal } from "./_c/ChangeGiftReceiverModal";
import { GiftList } from "./_c/GiftList";
import GiftsPageEmptyState from "./_c/GiftsPageEmptyState";
import { ReceivedGiftItemCard } from "./_c/ReceivedGiftItemCard";
import { ReceivedGiftItemCardSkeleton } from "./_c/ReceivedGiftItemCardSkeleton";
import { RedeemGiftModal } from "./_c/RedeemGiftModal";
import { SentGiftItemCard } from "./_c/SentGiftItemCard";
import { SentGiftItemCardSkeleton } from "./_c/SentGiftItemCardSkeleton";

const GIFT_PAGE_TABS = ["sent", "received"];

type GiftPageTab = (typeof GIFT_PAGE_TABS)[number];

export default function GiftsPage() {
  usePageSEO({ title: "Gifts" });

  const [activeTab, setActiveTab] = useQueryState(
    "type",
    parseAsStringLiteral(GIFT_PAGE_TABS).withDefault("sent"),
  );

  // Shared state for 2 tabs
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ scroll: true }),
  );

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const { data: sentGifts, isPending: pendingSent } = useGetSentGifts({ page, pageSize });

  const { data: receivedGifts, isPending: pendingReceived } = useGetReceivedGifts({
    page,
    pageSize,
  });

  const changeReceiverMutation = useChangeGiftReceiver();
  const revokeGiftMutation = useRevokeGift();
  const redeemGiftMutation = useRedeemGift();

  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);

  //  Handle tab changes and reset page
  const handleTabChange = (tab: GiftPageTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleOpenChangeGiftReceiverModal = (giftId: string) => {
    setSelectedGiftId(giftId);
    setChangeModalOpen(true);
  };

  const handleChangeGiftReceiver = (receiverEmail: string) => {
    if (!selectedGiftId) return;
    changeReceiverMutation.mutate({ id: selectedGiftId, receiverEmail });
  };

  const handleRevoke = (giftId: string) => {
    const gift = sentGifts?.items.find((g) => g.id === giftId);
    if (!gift) return;

    modals.openConfirmModal({
      title: "Revoke Gift",
      centered: true,
      children: (
        <>
          <p>
            Are you sure you want to <strong>revoke</strong> the gift sent to:{" "}
            <span className="font-semibold">{gift.receiverEmail}</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </>
      ),
      labels: { confirm: "Revoke", cancel: "Cancel" },
      confirmProps: { color: "red", loading: revokeGiftMutation.isPending },
      onConfirm: () => revokeGiftMutation.mutate(giftId),
    });
  };

  const handleRedeem = (giftId: string) => {
    const gift = receivedGifts?.items.find((g) => g.id === giftId);
    if (!gift) return;

    modals.openConfirmModal({
      title: "Redeem Gift",
      centered: true,
      children: (
        <>
          <p>
            Do you want to <strong>redeem</strong> this gift from:{" "}
            <span className="font-semibold">{gift.giverEmail}</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Once redeemed, the gift will be added to your account.
          </p>
        </>
      ),
      labels: { confirm: "Redeem", cancel: "Cancel" },
      confirmProps: { color: "violet", loading: redeemGiftMutation.isPending },
      onConfirm: () => redeemGiftMutation.mutate(giftId),
    });
  };

  const selectedGift = sentGifts?.items.find((g) => g.id === selectedGiftId) ?? null;

  return (
    <div className="mx-auto">
      <Title order={1} className="text-3xl font-bold mb-6 text-center">
        🎁 My Gifts
      </Title>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-y-5">
        <div className="flex gap-x-4">
          <button
            onClick={() => handleTabChange("sent")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "sent"
                ? "bg-primary text-white"
                : "bg-gray-50 dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500"
              }`}
          >
            Sent
          </button>
          <button
            onClick={() => handleTabChange("received")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "received"
                ? "bg-primary text-white"
                : "bg-gray-50 dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500"
              }`}
          >
            Received
          </button>
        </div>

        <Button
          onClick={() => setRedeemModalOpen(true)}
          color="violet"
          className="text-sm px-4 py-2 rounded transition"
          leftSection={<GemIcon size={14} />}
        >
          Redeem by Gift Code
        </Button>
      </div>

      <div className="mx-auto max-w-4xl">
        {activeTab === "sent" ? (
          <GiftList
            items={sentGifts?.items}
            pending={pendingSent}
            emptyState={<GiftsPageEmptyState type="sent" />}
            skeleton={Array.from({ length: 4 }).map((_, i) => (
              <SentGiftItemCardSkeleton key={i} />
            ))}
            renderItem={(gift) => (
              <SentGiftItemCard
                key={gift.id}
                gift={gift}
                onRevoke={handleRevoke}
                onChangeReceiver={() => handleOpenChangeGiftReceiverModal(gift.id)}
              />
            )}
          />
        ) : (
          <GiftList
            items={receivedGifts?.items}
            pending={pendingReceived}
            emptyState={<GiftsPageEmptyState type="received" />}
            skeleton={Array.from({ length: 4 }).map((_, i) => (
              <ReceivedGiftItemCardSkeleton key={i} />
            ))}
            renderItem={(gift) => (
              <ReceivedGiftItemCard key={gift.id} gift={gift} onRedeem={handleRedeem} />
            )}
          />
        )}
      </div>

      <AppPagination
        page={page}
        pageSize={pageSize}
        itemsCount={activeTab === "sent" ? (sentGifts?.count ?? 0) : (receivedGifts?.count ?? 0)}
        onPageChange={setPage}
        withEdges
        className="flex justify-center items-center mt-10"
      />

      <RedeemGiftModal open={redeemModalOpen} onClose={() => setRedeemModalOpen(false)} />
      <ChangeGiftReceiverModal
        key={selectedGift?.id}
        opened={changeModalOpen}
        onClose={() => setChangeModalOpen(false)}
        onSubmit={handleChangeGiftReceiver}
        submitting={changeReceiverMutation.isPending}
        defaultEmail={selectedGift?.receiverEmail ?? ""}
      />
    </div>
  );
}
