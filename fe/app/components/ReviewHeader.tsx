"use client";

import { Typography, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { Review } from "@/lib/types";

const ReviewHeader = ({
  session,
  id,
}: {
  session: Session | null;
  id: string;
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserReview = async () => {
      if (!session?.user?.id) return;
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/products/${id}`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        const reviews = await res.json();
        
        // Check if the user has already reviewed the product
        const userReview = reviews.find(
          (review: Review) => review.userId === session.user.id
        );
        
        setHasReviewed(!!userReview);
      } catch (error) {
        console.error('Error checking user review:', error);
      }
    };

    checkUserReview();
  }, [session, id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Customer Reviews</Typography>
        {session ? (
          hasReviewed ? (
            <Typography color="text.secondary">
              You have already reviewed this product
            </Typography>
          ) : (
            !showForm && (
              <Button
                variant="contained"
                onClick={() => setShowForm(true)}
              >
                Write a Review
              </Button>
            )
          )
        ) : (
          <Button
            variant="contained"
            onClick={() => router.push("/login")}
          >
            Login to Review
          </Button>
        )}
      </Box>

      {showForm && !hasReviewed && (
        <Box sx={{ mb: 3 }}>
          <ReviewForm productId={id} />
        </Box>
      )}
    </>
  );
};

export default ReviewHeader;