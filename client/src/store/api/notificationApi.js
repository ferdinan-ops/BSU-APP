import { apiSlice } from './apiSlice'

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/notifications',
      providesTags: ['Notification']
    }),
    markAsRead: builder.mutation({
      query: (notifId) => ({
        url: `/notifications/mark/${notifId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Notification']
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: '/notifications/mark-all',
        method: 'PUT'
      }),
      invalidatesTags: ['Notification']
    }),
    getNotReadCount: builder.query({
      query: () => '/notifications/count',
      providesTags: ['Notification']
    })
  })
})

export const { useGetNotificationsQuery, useMarkAsReadMutation, useMarkAllAsReadMutation, useGetNotReadCountQuery } =
  notificationApi
