import { Button } from "@mantine/core";
import { GemIcon } from "lucide-react";
import { useState } from "react";
import CenterLoader from "../../components/CenterLoader";
import { useGetReceivedGifts, useGetSentGifts } from "../../react-query/gift/giftHooks";
import { GiftTable } from "./_c/GiftTable";
import { RedeemGiftModal } from "./_c/RedeemGiftModal";

export default function GiftsPage() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);

  const { data: sentGifts, isLoading: loadingSent } = useGetSentGifts();
  const { data: receivedGifts, isLoading: loadingReceived } = useGetReceivedGifts();

  const handleRevoke = (giftId: string) => {
    alert(`Revoke gift ID: ${giftId}`);
  };

  const handleChangeReceiver = (giftId: string) => {
    alert(`Change receiver for gift ID: ${giftId}`);
  };

  const handleRedeem = (giftId: string) => {
    alert(`Redeem gift ID: ${giftId}`);
  };

  const renderGiftContent = () => {
    if (activeTab === "sent") {
      if (loadingSent) return <CenterLoader />;
      return (
        <GiftTable
          gifts={sentGifts?.items ?? []}
          canManage
          onRevoke={handleRevoke}
          onChangeReceiver={handleChangeReceiver}
        />
      );
    } else {
      if (loadingReceived) return <CenterLoader />;
      return <GiftTable gifts={receivedGifts?.items ?? []} onRedeem={handleRedeem} />;
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🎁 My Gifts</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-y-5">
        <div className="flex gap-x-4">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "sent" ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100" }`}
          >
            Sent
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition ${
              activeTab === "received" ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100" }`}
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

      {renderGiftContent()}

      <RedeemGiftModal open={redeemModalOpen} onClose={() => setRedeemModalOpen(false)} />
    </div>
  );
}
