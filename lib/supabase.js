import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('paste_your') &&
  !supabaseKey.includes('paste_your')

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: () => ({
        insert: async () => ({ error: null, data: null }),
      }),
    }
