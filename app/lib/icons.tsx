import type { ReactNode } from 'react'
import { FaWrench, FaHelmetSafety, FaRoad } from 'react-icons/fa6'
import { GiBrickWall } from 'react-icons/gi'
import type { EducationField } from '@/generated/prisma'

// ── Actions ───────────────────────────────────────────────────────────────────
export { FaRegTrashCan           as IconDelete        } from 'react-icons/fa6'
export { FaPen                   as IconEdit          } from 'react-icons/fa6'
export { FaPlus                  as IconPlus          } from 'react-icons/fa6'
export { FaArrowRotateLeft       as IconRevert        } from 'react-icons/fa6'
export { FaXmark                 as IconClose         } from 'react-icons/fa6'
export { FaCopy                  as IconCopy          } from 'react-icons/fa6'
export { FaCheck                 as IconCheck         } from 'react-icons/fa6'
export { FaCircleCheck           as IconSuccess       } from 'react-icons/fa6'
export { FaCircleCheck           as IconStepQuality   } from 'react-icons/fa6'
export { FaTriangleExclamation   as IconWarning       } from 'react-icons/fa6'
export { FaMagnifyingGlass       as IconSearch        } from 'react-icons/fa6'
export { FaMagnifyingGlass       as IconStepBrowse    } from 'react-icons/fa6'
export { FaSliders               as IconFilter        } from 'react-icons/fa6'
export { FaArrowsRotate          as IconReset         } from 'react-icons/fa6'
export { FaFilePdf               as IconPdf           } from 'react-icons/fa6'
export { FaGripVertical          as IconDrag          } from 'react-icons/fa6'
export { FaEllipsis              as IconMenuDots      } from 'react-icons/fa6'
export { FaArrowUpRightFromSquare as IconExternalLink } from 'react-icons/fa6'
export { FaLink                  as IconLink          } from 'react-icons/fa6'
export { FaEye                   as IconPublish       } from 'react-icons/fa6'
export { FaEyeSlash              as IconUnpublish     } from 'react-icons/fa6'
export { FaSpinner               as IconSpinner       } from 'react-icons/fa6'

export { FaArrowRightFromBracket as IconSignOut    } from 'react-icons/fa6'

// ── Navigation / chrome ───────────────────────────────────────────────────────
export { FaChevronDown  as IconChevronDown  } from 'react-icons/fa6'
export { FaChevronLeft  as IconChevronLeft  } from 'react-icons/fa6'
export { FaChevronRight as IconChevronRight } from 'react-icons/fa6'
export { FaBars         as IconMenuOpen     } from 'react-icons/fa6'

// ── Status ────────────────────────────────────────────────────────────────────
// RiProgress3Line has no fa6 visual equivalent for "change status"
export { RiProgress3Line as IconStatusChange } from 'react-icons/ri'

// ── Communication ─────────────────────────────────────────────────────────────
export { FaEnvelope    as IconEmail    } from 'react-icons/fa6'
export { FaPhone       as IconPhone    } from 'react-icons/fa6'
export { FaLocationDot as IconLocation } from 'react-icons/fa6'
export { FaFacebook    as IconFacebook } from 'react-icons/fa6'
export { FaGlobe       as IconWebsite  } from 'react-icons/fa6'

// ── Content / state ───────────────────────────────────────────────────────────
export { FaCircleInfo  as IconInfo             } from 'react-icons/fa6'
export { FaQuestion    as IconUnknown          } from 'react-icons/fa6'
export { FaQuoteLeft   as IconQuote            } from 'react-icons/fa6'
export { FaImage       as IconImagePlaceholder } from 'react-icons/fa6'
export { FaFileInvoice as IconBillingAddress   } from 'react-icons/fa6'

// ── Products / orders ─────────────────────────────────────────────────────────
export { FaBox          as IconProduct      } from 'react-icons/fa6'
export { FaBoxesStacked as IconProductQty   } from 'react-icons/fa6'
export { FaBoxOpen      as IconProductEmpty } from 'react-icons/fa6'
export { FaCoins        as IconPrice        } from 'react-icons/fa6'
export { FaCalendarDays as IconDate         } from 'react-icons/fa6'
export { FaInfo         as IconDetails      } from 'react-icons/fa6'

// ── People ────────────────────────────────────────────────────────────────────
export { FaUser      as IconPerson } from 'react-icons/fa6'
export { FaBuilding  as IconOrg    } from 'react-icons/fa6'
export { FaBriefcase as IconRole   } from 'react-icons/fa6'
export { FaHouse     as IconHome   } from 'react-icons/fa6'

// ── Landing page process steps ────────────────────────────────────────────────
export { FaCartShopping  as IconStepOrder     } from 'react-icons/fa6'
export { FaClipboardCheck as IconStepApprove  } from 'react-icons/fa6'
export { FaTruck          as IconStepDeliver  } from 'react-icons/fa6'
export { FaFileContract   as IconStepAgreement } from 'react-icons/fa6'

// ── Education field icons ─────────────────────────────────────────────────────
// GiBrickWall has no fa6 visual equivalent for the concrete/masonry field
export const EDUCATION_FIELD_ICONS: Record<EducationField, ReactNode> = {
  PLUMBER:      <FaWrench       className="shrink-0" aria-hidden="true" />,
  CONCRETE:     <GiBrickWall    className="shrink-0" aria-hidden="true" />,
  CARPENTER:    <FaHelmetSafety className="shrink-0" aria-hidden="true" />,
  CONSTRUCTION: <FaRoad         className="shrink-0" aria-hidden="true" />,
}
