import Papa from 'papaparse'

const parseSheets = () => new Promise((resolve) => {
  Papa.parse(process.env.REACT_APP_SHEETS_LINK, {
    download: true,
    header: true,
    newline: '',
    complete: (res, file) => {
      resolve(res.data)
    }
  })
})

const parseSheetsById = (id) => new Promise((resolve) => {
  Papa.parse(process.env.REACT_APP_SHEETS_LINK, {
    download: true,
    header: true,
    newline: '',
    step: row => {
      if (row.data.slug === id) {
        resolve(row.data)
      }
    }
  })
})

const getBlogPosts = async () => {
  return await parseSheets()
}

const getBlogPost = async (id) => {
  return await parseSheetsById(id);
}

export { getBlogPosts, getBlogPost }