'use client'
import { cn } from '@/lib/utils'
import {
  GooglePayLogo,
  PhonePeLogo,
  PaytmLogo,
  AmazonPayLogo,
  BHIMLogo,
  CREDLogo,
  WhatsAppPayLogo,
  MobikwikLogo,
  FreechargeLogo,
  NaviLogo,
  FiLogo,
  JupiterLogo,
  NiyoLogo,
  HDFCLogo,
  ICICILogo,
  SBILogo,
  KotakLogo,
  AxisLogo,
  IDFCLogo,
  AUBankLogo,
  ZerodhaLogo,
  GrowwLogo,
  UpstoxLogo,
  FyersLogo,
  AngelOneLogo,
  INDmoneyLogo,
  PaytmMoneyLogo,
  ETMoneyLogo,
  DhanLogo,
  FivePaisaLogo,
  SliceLogo,
  OneCardLogo,
  SBICashbackLogo,
  HDFCRegaliaLogo,
  AxisAceLogo,
  ICICIAmazonLogo,
  IDFCWowLogo,
  ScapiaLogo,
  UniCardLogo,
  NiyoGlobalLogo,
  IxigoLogo,
  MakeMyTripLogo,
  YatraLogo,
  EaseMyTripLogo,
  AxisAtlasLogo,
  AirIndiaLogo,
} from '@/components/icons/FintechLogos'

const LOGO_MAP = {
  gpay: GooglePayLogo,
  phonepe: PhonePeLogo,
  paytm: PaytmLogo,
  amazonpay: AmazonPayLogo,
  bhim: BHIMLogo,
  cred: CREDLogo,
  whatsapppay: WhatsAppPayLogo,
  mobikwik: MobikwikLogo,
  freecharge: FreechargeLogo,
  navi: NaviLogo,
  fi: FiLogo,
  jupiter: JupiterLogo,
  niyo: NiyoLogo,
  hdfc: HDFCLogo,
  icici: ICICILogo,
  sbi: SBILogo,
  kotak811: KotakLogo,
  axis: AxisLogo,
  idfc: IDFCLogo,
  aubank: AUBankLogo,
  zerodha: ZerodhaLogo,
  groww: GrowwLogo,
  upstox: UpstoxLogo,
  fyers: FyersLogo,
  angelone: AngelOneLogo,
  indmoney: INDmoneyLogo,
  paytmmoney: PaytmMoneyLogo,
  etmoney: ETMoneyLogo,
  dhan: DhanLogo,
  '5paisa': FivePaisaLogo,
  slice: SliceLogo,
  onecard: OneCardLogo,
  sbicashback: SBICashbackLogo,
  hdfcregalia: HDFCRegaliaLogo,
  axisace: AxisAceLogo,
  iciciamazon: ICICIAmazonLogo,
  idfcwow: IDFCWowLogo,
  scapia: ScapiaLogo,
  unicard: UniCardLogo,
  niyoglobal: NiyoGlobalLogo,
  ixigo: IxigoLogo,
  makemytrip: MakeMyTripLogo,
  yatra: YatraLogo,
  easemytrip: EaseMyTripLogo,
  axisatlas: AxisAtlasLogo,
  airindia: AirIndiaLogo,
}

export default function AppLogo({ app, size = 48, className }) {
  const px = size

  if (!app) {
    return (
      <div
        className={cn('rounded-2xl bg-emerald-500/20 flex items-center justify-center', className)}
        style={{ width: px, height: px }}
      >
        <span className="text-emerald-400 text-xs font-bold">?</span>
      </div>
    )
  }

  const LogoComponent = LOGO_MAP[app.id]

  if (LogoComponent) {
    return (
      <div className={cn('rounded-2xl overflow-hidden shadow-glow-sm', className)}>
        <LogoComponent size={px} />
      </div>
    )
  }

  // Fallback for apps without SVG logos
  return (
    <div
      className={cn(
        'rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ring-1 ring-emerald-500/30',
        className
      )}
      style={{ width: px, height: px, backgroundColor: app.brandColor || '#22c55e' }}
    >
      <span style={{ fontSize: px * 0.35 }}>{app.name.slice(0, 2).toUpperCase()}</span>
    </div>
  )
}
