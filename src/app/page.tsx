import { revalidatePath } from "next/cache";
import { db } from "../db";
import { users } from "../db/schema";

export default async function Home() {
  const allUsers = await db.select().from(users);

  async function addUsers(data: FormData) {
    'use server'

    const fullName = data.get('full_name')?.toString();
    const phone = data.get('phone')?.toString();

    await db.insert(users).values({
      fullName,
      phone
    })

    revalidatePath('/')
  }

  return (
    <div className='bg-zinc-900 text-zinc-50 flex min-h-screen items-center justify-center flex-col gap-6'>
      <p>{JSON.stringify(allUsers, null, 2)}</p>
      <form action={addUsers} className="text-zinc-900 flex flex-col gap-3">
        <input type="text" name="full_name" placeholder="Full name" />
        <input type="text" name="phone" placeholder="Phone" />

        <button type="submit" className="text-zinc-50">Create</button>
      </form>
    </div>
  )
}
