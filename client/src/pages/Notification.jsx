import { Button, Container, NotifCard, Section } from '../components'
import { useGetNotificationsQuery, useMarkAllAsReadMutation } from '../store/api/notificationApi'

const Notification = () => {
  const { data: notif, isSuccess } = useGetNotificationsQuery()
  const [markAllAsRead, { isLoading }] = useMarkAllAsReadMutation()

  const handleMarkAllAsRead = (e) => {
    e.preventDefault()
    markAllAsRead()
  }

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
          <Button
            variant="primary"
            className="ml-auto px-2 md:px-4 md:text-xs"
            onClick={handleMarkAllAsRead}
            loading={isLoading}
          >
            Tandai Sudah Dibaca
          </Button>
          <section className="flex flex-col gap-2 md:gap-3">
            {isSuccess && notif.data?.map((item) => <NotifCard notif={item} key={item._id} />)}
          </section>
        </section>
      </Container>
    </Section>
  )
}

export default Notification
