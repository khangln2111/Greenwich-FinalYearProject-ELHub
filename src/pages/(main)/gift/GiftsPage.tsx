import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { GemIcon, GiftIcon } from "lucide-react";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppPagination from "../../../components/AppPagination/AppPagination";
import CenterLoader from "../../../components/CenterLoader";
import {
  useChangeGiftReceiver,
  useGetReceivedGifts,
  useGetSentGifts,
  useRevokeGift,
} from "../../../features/gift/giftHooks";
import { ChangeGiftReceiverModal } from "./_c/ChangeGiftReceiverModal";
import { ReceivedGiftItemCard } from "./_c/ReceivedGiftItemCard";
import { RedeemGiftModal } from "./_c/RedeemGiftModal";
import { SentGiftItemCard } from "./_c/SentGiftItemCard";

const GIFT_PAGE_TABS = ["sent", "received"];
type GiftPageTab = (typeof GIFT_PAGE_TABS)[number];

export default function GiftsPage() {
  const [activeTab, setActiveTab] = useQueryState(
    "type",
    parseAsStringLiteral(GIFT_PAGE_TABS).withDefault("sent"),
  );

  // Shared state for 2 tabs
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(6));

  const { data: sentGifts, isPending: pendingSent } = useGetSentGifts({ page, pageSize });

  const { data: receivedGifts, isPending: pendingReceived } = useGetReceivedGifts({
    page,
    pageSize,
  });

  const changeReceiverMutation = useChangeGiftReceiver();
  const revokeGiftMutation = useRevokeGift();

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

  const handleRedeem = (giftId: string) => alert(`Redeem: ${giftId}`);

  const renderSent = () => {
    if (pendingSent) return <CenterLoader />;

    if (!sentGifts || sentGifts.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <GiftIcon className="w-14 h-14 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            You haven’t sent any gifts yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share the joy of learning by gifting a course to someone special.
          </p>
          <Link
            to="/dashboard/inventory"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium
              transition"
          >
            Browse Inventory
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {sentGifts.items.map((gift) => (
          <SentGiftItemCard
            key={gift.id}
            gift={gift}
            onRevoke={handleRevoke}
            onChangeReceiver={() => handleOpenChangeGiftReceiverModal(gift.id)}
          />
        ))}
      </div>
    );
  };

  const renderReceived = () => {
    if (pendingReceived) return <CenterLoader />;

    if (!receivedGifts || receivedGifts.items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <GiftIcon className="w-14 h-14 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            No gifts received yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            When someone sends you a gift, it will appear here. Stay tuned!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {receivedGifts.items.map((gift) => (
          <ReceivedGiftItemCard key={gift.id} gift={gift} onRedeem={handleRedeem} />
        ))}
      </div>
    );
  };

  const selectedGift = sentGifts?.items.find((g) => g.id === selectedGiftId) ?? null;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎁 My Gifts</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-y-5">
        <div className="flex gap-x-4">
          <button
            onClick={() => handleTabChange("sent")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "sent"
                ? "bg-blue-600 text-white dark:bg-blue-700"
                : "bg-gray-50 dark:bg-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500"
                }`}
          >
            Sent
          </button>
          <button
            onClick={() => handleTabChange("received")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "received"
                ? "bg-blue-600 text-white dark:bg-blue-700"
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

      {activeTab === "sent" ? renderSent() : renderReceived()}

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
