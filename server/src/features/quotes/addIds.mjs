import quotes from './quotes.json'
import { nanoid } from 'nanoid'
import fs from 'fs/promises'
;(async () => {
  quotes.quotes.forEach((quote) => {
    quote.id = nanoid()
  })

  await fs.writeFile('./quotes.json', JSON.stringify(quotes), 'utf-8')
  await fs.writeFile('./quotesOriginal.json', JSON.stringify(quotes), 'utf-8')
})()
