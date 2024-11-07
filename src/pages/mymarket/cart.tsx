// /mymarket/cart/pages.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartHeader from "@/components/header/CategoryHeader";
import MyMarketFooterNav from "@/components/navbar/MyMarketFooterNav";
import TabMenu from "@/components/header/TabMenu";
import NonCheckSvg from "/public/svgs/element/non_check.svg";
import CheckSvg from "/public/svgs/element/check.svg";
import CartItem from "@/components/items/CartItem";
import OrderSummary from "@/components/items/OrderSummary";
import EmptyCartSvg from "../../../public/svgs/element/empty_cart.svg";
import Link from "next/link";
import { CartItemType } from "@/types/item";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteCartItem,
  getAllMyCarts,
  patchCartItem,
} from "@/services/carts/carts";
import { useUserStore } from "@/store/user";
import LoadingComponent from "@/components/common/Loading";

const ChoiceDelete = styled.div`
  display: flex;
  height: 48px;
  background-color: white;
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const TotalChoiceText = styled.span`
  font-family: "Pretendard";
  font-size: 12px;
  color: black;
  text-align: center;
`;

const DeleteText = styled.span`
  font-size: 12px;
  color: #545454;
  text-align: center;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: inherit;
  height: calc(100vh - 300px);
  position: fixed;
  top: 108px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.span`
  font-size: 16px;
  color: #d9d9d9;
  text-align: center;
  margin-top: 16px;
`;

const DongleMarketButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  padding: 12px;
  text-decoration: none;
  margin-top: 8px;
`;

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]); // 장바구니 상품 목록 (삭제시 여기서 삭제)
  const [selectedItems, setSelectedItems] = useState<CartItemType[]>([]); // 선택된 상품 목록
  const [selectAll, setSelectAll] = useState(true); // 전체선택용 boolean
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격
  const setCartCount = useUserStore((state) => state.setCartCount);
  const [isLoading, setIsLoading] = useState(true);

  /** 초기 데이터 로드 */
  useEffect(() => {
    const fetchAllMyCarts = async () => {
      try {
        const data = await getAllMyCarts();
        const cartItems = data.carts.map((cart) => ({
          cartId: cart.cartId,
          itemId: cart.item.itemId,
          itemCount: cart.itemCount,
          price: cart.item.lprice,
          imageurl: cart.item.image,
          brand: cart.item.brand,
          name: cart.item.title,
        }));
        setCartItems(cartItems);
        setSelectedItems(cartItems);
        setCartCount(cartItems.length);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMyCarts();
  }, []);

  /** selectedItem 감지 */
  useEffect(() => {
    setSelectAll(cartItems.length === selectedItems.length); // 전체 선택

    const sumPrice = selectedItems.reduce(
      (acc, cur) => acc + cur.price * cur.itemCount,
      0
    );
    console.log(selectedItems, sumPrice);
    setTotalPrice(sumPrice);
  }, [selectedItems]);

  /** 전체선택 토글 */
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedItems([]);
    } else {
      setSelectAll(true);
      setSelectedItems(cartItems);
    }
  };

  /** 개별 선택 토글 */
  const toggleItemSelection = (cartId: number) => {
    let newSelectedItems: CartItemType[] = [];
    if (selectedItems.some((selectedItem) => selectedItem.cartId === cartId)) {
      newSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem.cartId !== cartId
      );
    } else {
      const newSelectedItem = cartItems.find((item) => item.cartId === cartId);
      if (newSelectedItem) {
        newSelectedItems = [...selectedItems, newSelectedItem];
      }
    }
    setSelectedItems(newSelectedItems);
    return;
  };

  /** 상품 삭제 및 selectedItem에서도 제거 */
  const removeItem = async (cartId: number) => {
    const newSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.cartId !== cartId
    );
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.cartId !== cartId
    ); // cartItem에서 삭제
    const data = await deleteCartItem(cartId);
    if (data.cartCount) setCartCount(data.cartCount);

    setCartItems(newCartItems);
    setSelectedItems(newSelectedItems);
  };

  /** 선택된 상품 삭제 */
  const removeSelectedItems = async () => {
    const cartIds = selectedItems.map((item) => item.cartId);
    await Promise.all(cartIds.map((cartId) => deleteCartItem(cartId)));
    const remainItems = cartItems.length - cartIds.length;
    setCartCount(remainItems);

    setCartItems(
      cartItems.filter(
        (cartItem) =>
          !selectedItems.some(
            (selectedItem) => selectedItem.cartId === cartItem.cartId
          )
      )
    );
    setSelectedItems([]);
		handleToast("장바구니에서 상품을 지웠어요.")
  };

  const updateItemUtil = async (
    items: CartItemType[],
    cartId: number,
    increment: boolean
  ) => {
    let isError = false;
    const newItems = await Promise.all(
      items.map(async (item) => {
        if (item.cartId === cartId) {
          const newCount = increment ? item.itemCount + 1 : item.itemCount - 1;
          try {
            const data = await patchCartItem(item.cartId, newCount);
            return { ...item, itemCount: data.itemCount };
          } catch {
            isError = true;
            return item;
          }
        } else {
          return item;
        }
      })
    );
    return { newItems, isError };
  };

  const handleUpdate = async (cartId: number, increase: boolean) => {
    const { newItems: newCartItems, isError: err1 } = await updateItemUtil(
      cartItems,
      cartId,
      increase
    );
    const { newItems: newSelectedItems, isError: err2 } = await updateItemUtil(
      selectedItems,
      cartId,
      increase
    );

    if (err1 || err2) {
      handleToast("1개부터 구매 가능합니다.");
      return;
    }

    setCartItems(newCartItems);
    setSelectedItems(newSelectedItems);
  };

  const handleToast = (message: string) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        marginBottom: "32px",
        marginRight: "16px",
        marginLeft: "16px",
      },
    });
  };

  /** 선택한 상품 세션에 담기 */
  const handleOrder = () => {
    if (selectedItems.length === 0) {
      handleToast("상품을 선택해주세요.");
      return;
    }
    sessionStorage.setItem("cartItems", JSON.stringify(selectedItems));
    router.push("/payments");
  };

  const itemCount = cartItems.length;
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  
  if (isLoading) return <LoadingComponent src="/images/skeleton/cartpage_skeleton.png" />
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        style={{
          marginBottom: "135px",
          padding: 0,
          width: "100%",
        }}
      />
      <div className="page">
        <CartHeader />
        <div className="content" style={{ paddingBottom: "163px" }}>
          <TabMenu />
          {cartItems.length === 0 ? (
            <PageContent>
              <EmptyContainer>
                <EmptyCartSvg />
                <EmptyText>장바구니가 텅 비었어요</EmptyText>
                <DongleMarketButton href="/home">
                  동글마켓 구경가기
                </DongleMarketButton>
              </EmptyContainer>
            </PageContent>
          ) : (
            <>
              <ChoiceDelete>
                <CheckBoxContainer onClick={toggleSelectAll}>
                  {selectAll ? <CheckSvg /> : <NonCheckSvg />}
                  <TotalChoiceText>전체선택</TotalChoiceText>
                </CheckBoxContainer>
                <DeleteText onClick={removeSelectedItems}>선택 삭제</DeleteText>
              </ChoiceDelete>
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  selected={selectedItems.some(
                    (selectedItem) => selectedItem.cartId === item.cartId
                  )}
                  toggleSelection={() => toggleItemSelection(item.cartId)}
                  removeItem={() => removeItem(item.cartId)}
                  handleIncrement={() => handleUpdate(item.cartId, true)}
                  handleDecrement={() => handleUpdate(item.cartId, false)}
                />
              ))}
            </>
          )}
        </div>
        {itemCount > 0 && (
          <OrderSummary
            itemCount={selectedCount}
            totalPrice={totalPrice}
            onClick={handleOrder}
          />
        )}
        <MyMarketFooterNav />
      </div>
      {/* Custom CSS for toast style */}
      <style jsx global>{`
        .Toastify__toast-container {
          max-width: 600px;
          width: 100%;
        }
        .Toastify__toast {
          font-size: 14px;
          background-color: rgba(0, 0, 0, 0.5) !important;
          color: #fff !important;
          backdrop-filter: blur(5px);
          border-radius: 16px;
          margin: 16px;
        }
      `}</style>
    </>
  );
}
