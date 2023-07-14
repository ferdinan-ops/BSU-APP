import { MdNotificationsActive } from 'react-icons/md'

import { useGetNotificationsQuery, useMarkAllAsReadMutation } from '../store/api/notificationApi'
import { Button, Container, NotifCard, NotifSkeleton, Section } from '../components'
import NoData from '../components/molecules/NoData'

const Notification = () => {
  const { data: notif, isSuccess, isLoading } = useGetNotificationsQuery()
  const [markAllAsRead, { isLoading: isLoadingMark }] = useMarkAllAsReadMutation()

  const handleMarkAllAsRead = (e) => {
    e.preventDefault()
    markAllAsRead()
  }

  let content = null
  if (isLoading) {
    content = [...Array(3)].map((_, i) => <NotifSkeleton key={i} />)
  } else if (isSuccess && notif.data?.length > 0) {
    content = notif.data?.map((item) => <NotifCard notif={item} key={item._id} />)
  } else if (isSuccess && notif.data?.length === 0) {
    content = (
      <div className="mt-10">
        <NoData
          Icon={MdNotificationsActive}
          title="Tidak ada notifikasi"
          text="Anda tidak memiliki notifikasi apapun."
        />
      </div>
    )
  }

  console.log(isLoadingMark)

  return (
    <Section title="Notifikasi" className="py-8">
      <Container>
        <section className="mx-auto flex flex-col gap-4 md:w-7/12 md:gap-5">
          <div className="flex flex-col">
            <h1 className="mb-3 text-center text-3xl font-bold tracking-wide md:mb-5 md:text-4xl">Notifikasi</h1>
            <p className="text-sm text-font/70 md:text-base">
              Disini anda bisa melihat semua notifikasi berhubungan dengan topik yang terkait dengan anda.
            </p>
            <p className="text-sm font-semibold md:text-base">Klik notifikasinya untuk menuju ke topik.</p>
          </div>
          {notif?.data?.length > 0 && (
            <Button
              variant="primary"
              className="ml-auto px-3 md:px-4 md:text-xs"
              onClick={handleMarkAllAsRead}
              loading={isLoadingMark}
            >
              Tandai Sudah Dibaca
            </Button>
          )}
          <section className="flex flex-col gap-2 md:gap-3">{content}</section>
        </section>
      </Container>
    </Section>
  )
}

export default Notification
