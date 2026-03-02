import { ActionIcon, Box, Group, Indicator, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { PanelRightCloseIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import ThemeToggler from "../../components/ThemeToggler/ThemeToggler";
import { useGetCurrentUser } from "../../features/auth/identity.hooks";
import { RoleName } from "../../features/auth/identity.types";
import { useGetCartItemCountSelf } from "../../features/cart/cart.hooks";
import { useGetUnreadNotificationsCount } from "../../features/notification/notification.hooks";
import { cn } from "../../utils/cn";
import AvatarMenu from "../user/_c/AvatarMenu";
import MobileHamburgerMenu from "../user/_c/MobileHamburgerMenu";

const AuthLayoutHeader = () => {
  const { data: currentUser, isLoading: isUserLoading } = useGetCurrentUser();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: cartItemCount } = useGetCartItemCountSelf();
  const { data: unreadNotificationsCount } = useGetUnreadNotificationsCount(RoleName.Learner);

  return (
    <Box
      component="header"
      className={cn(
        `min-h-[55px] px-4 lg:px-7 content-center transition-all bg-transparent border-b-0 shadow-none z-10
        fixed top-0 left-0 right-0`,
      )}
    >
      {/* Search mode (mobile full width) */}
      <div className="flex items-center justify-between h-full gap-2 md:gap-4 lg:gap-10">
        {/* Logo + drawer toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <PanelRightCloseIcon onClick={toggleDrawer} className="hidden-from-lg block" />
          <Link to="/">
            <BrandLogo
              classNames={{
                text: "hidden lg:block tracking-wide",
              }}
            />
          </Link>
        </div>

        {/* Action icons */}
        <Group className="h-full">
          {!currentUser && !isUserLoading && <ThemeToggler className="bg-transparent border-0" />}

          {/* Notification (desktop only) */}
          {isUserLoading ? (
            <Skeleton visibleFrom="lg" width={34} height={34} />
          ) : (
            currentUser && (
              <Indicator
                label={unreadNotificationsCount ?? 0}
                size={20}
                offset={2}
                position="top-end"
                visibleFrom="lg"
              >
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Notification trigger"
                  component={Link}
                  to="/dashboard/notifications"
                  className="bg-transparent border-0"
                >
                  <IconBell size={19} strokeWidth={1.5} />
                </ActionIcon>
              </Indicator>
            )
          )}

          {/* Cart */}
          {isUserLoading ? (
            <Skeleton width={34} height={34} />
          ) : (
            currentUser && (
              <Indicator
                label={cartItemCount && cartItemCount > 99 ? "99+" : (cartItemCount ?? 0)}
                size={20}
                offset={2}
                position="top-end"
              >
                <ActionIcon
                  variant="default"
                  size="lg"
                  aria-label="Shopping cart trigger"
                  component={Link}
                  to="/cart"
                  className="bg-transparent border-0"
                >
                  <ShoppingCart size={19} strokeWidth={1.5} />
                </ActionIcon>
              </Indicator>
            )
          )}

          {isUserLoading ? (
            <>
              <Skeleton width={34} height={34} />
              <div className="px-2 py-1">
                <Skeleton width={38} height={38} radius="full" />
              </div>
            </>
          ) : (
            currentUser && (
              <>
                <ThemeToggler className="bg-transparent border-0" />
                <AvatarMenu />
              </>
            )
          )}
        </Group>
      </div>
      {/* Drawer for mobile nav */}
      <MobileHamburgerMenu opened={drawerOpened} onClose={closeDrawer} />
    </Box>
  );
};

export default AuthLayoutHeader;
