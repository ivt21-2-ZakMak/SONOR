// import Image from 'next/image'
import Link from 'next/link'
import Field from '../field'

export default function Page() {
  return (
    <>
      <h1>Игра</h1>
      <p>
        <Link href='/'>Назад</Link>
      </p>
      {/* <Image alt='Field' src='field.svg' fill={true} unoptimized /> */}
      <Field props={{color: 'black'}} />
    </>
  )
}
