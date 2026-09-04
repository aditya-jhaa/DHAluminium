/* ============================================================
   DH Aluminium — products page behaviour
   Product catalogue data + category tabs + detail overlay.
   Loaded only by products.html.
   ============================================================ */

// Tab switching
function switchTab(tab, el) {
  document.querySelectorAll('.prod-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.prod-panel').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  const panel = document.getElementById('panel-' + tab);
  if (panel) {
    panel.classList.add('active');
    setTimeout(() => {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

// Product data
const PRODUCTS = {
  'comet-sliding-window': { name: 'Comet Sliding Window', category: 'Residential · Sliding Windows', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/08/CSW_Render.jpg', desc: 'An entry-level residential sliding window offering smooth, reliable operation with clean sightlines. Ideal for budget-conscious builds without compromising on quality or performance.', features: ['Smooth precision-roller operation','Clean, slim sightlines','Available in standard and custom sizes','Wide range of powder coat colours','Flyscreen compatible'] },
  'zeus-sliding-window': { name: 'Zeus Sliding Window', category: 'Residential · Sliding Windows', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/Ultramax_Sliding_1-400x304.jpg', desc: 'A premium sliding window system with larger frame profiles and enhanced weather sealing. Suits contemporary homes requiring a robust, high-performance sliding solution.', features: ['Heavy-duty frame profiles','Superior multi-point weather sealing','Suitable for larger glass spans','Enhanced security locking','Flyscreen and double glazing compatible'] },
  'comet-awning-window': { name: 'Comet Awning Window', category: 'Residential · Awning Windows', /* REPLACE (competitor site) */ image: 'https://www.keilorwindows.com.au/assets/images/awningwindowsimg1.jpg', desc: 'An entry-level top-hinged awning window that opens outward, allowing ventilation even during light rain. A practical, affordable choice for bathrooms, kitchens, and utility rooms.', features: ['Top-hinged outward opening','Ventilation in wet weather','Worm-gear operator for easy use','Flyscreen compatible','Available in multiple sizes'] },
  'apollo-awning-window': { name: 'Apollo Awning Window', category: 'Residential · Awning Windows', /* REPLACE (third party) */ image: 'https://s3-eu-west-1.amazonaws.com/specifiedbypro/15207/135144/ace-shelters-ltd-div-of-ace-engineers-morley-ltd_apollo-awning_photo_2_windowawning7.jpg', desc: 'A mid-range awning window combining improved weather resistance with a refined aesthetic. Suitable for suburban homes and multi-unit residential projects requiring dependable performance.', features: ['Enhanced weather sealing','Mid-range heavy-duty frames','Smooth worm-gear operation','Double glazing compatible','Suitable for multi-unit residential'] },
  'titan-awning-window': { name: 'Titan Awning Window', category: 'Residential · Awning Windows', image: 'images/products/titan-awning-window-v2.jpg', desc: 'Our premium awning window with heavy-duty profiles and superior weather seals. Designed for high-end residential projects that demand both architectural elegance and maximum performance.', features: ['Heavy-duty premium profiles','Superior multi-point weather seals','Large sash capacity','Double and triple glazing compatible','Ideal for high-end residential projects'] },
  'apollo-casement-window': { name: 'Apollo Casement Window', category: 'Residential · Casement Windows', /* REPLACE (Google thumbnail) */ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQewccADrvK4UGToOBTfSD3JOnMdHKmkee-xw&s', desc: 'A side-hinged casement window opening fully outward for maximum cross-flow ventilation. Clean lines and unobstructed views make it a popular choice for living rooms and bedrooms.', features: ['Side-hinged full outward opening','Maximum cross-flow ventilation','Clear, unobstructed sightlines','Flyscreen compatible','Suitable for residential and light commercial'] },
  'titan-casement-window': { name: 'Titan Casement Window', category: 'Residential · Casement Windows', /* REPLACE (Google thumbnail) */ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLoZVVVVYT76lK8o0l5P95Ai1h8njpBG1uA&s', desc: 'A premium casement window with larger sash capacity and enhanced hardware. Engineered for high-end residential and light commercial applications requiring wide glass openings.', features: ['Large sash capacity','Truth hardware for smooth operation','Traditional flyscreen compatible','Double glazing ready','Suitable for high-end residential and commercial'] },
  'comet-sliding-door': { name: 'Comet Sliding Door', category: 'Residential · Sliding Doors', /* REPLACE (Google thumbnail) */ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAoZ1aGigy1-9JWQD9VpUVRrDlr42w2UVTrg&s', desc: 'A smooth-gliding residential sliding door system for seamless indoor-outdoor living. Precision rollers and robust locking ensure reliable, everyday performance.', features: ['Precision stainless steel rollers','Robust multi-point locking','Wide panel widths available','Flyscreen track compatible','Indoor-outdoor living ready'] },
  'comet-stacker-door': { name: 'Comet Stacker Door', category: 'Residential · Sliding Doors', image: 'images/products/comet-stacker-door-v2.jpg', desc: 'A multi-panel stacking door system that fully opens wide wall spans. Panels stack neatly to one side, creating an expansive opening perfect for entertaining areas and alfresco spaces.', features: ['Multi-panel stacking configuration','Full wall-span opening','Panels stack flush to wall','Integrated flyscreen track','Ideal for alfresco and entertainment areas'] },
  'bif-titan-apartment-door-res': { name: 'BIF Titan Apartment Door', category: 'Residential · Sliding Doors', image: 'images/products/bif-titan-apartment-door-res-v2.jpg', desc: 'A sliding door system built to handle heavy-duty residential apartment applications. Engineered with reinforced frames and upgraded hardware to meet the demands of multi-storey living.', features: ['Reinforced heavy-duty frames','Upgraded roller and track system','High-weight glass capacity','Multi-point locking as standard','Designed for apartment applications'] },
  'artemis-series': { name: 'Artemis Series Entry Door', category: 'Residential · Doors', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/08/titan-entry-949x1024.jpg', desc: 'A premium residential entry door series combining striking kerb appeal with strong security performance. Available in a range of configurations to suit diverse architectural styles.', features: ['Premium entry door aesthetics','High-security multi-point locking','Multiple configuration options','Double glazing compatible','Suits all architectural styles'] },
  'windsor-bifold-door-res': { name: 'Windsor Bi-Fold Door', category: 'Residential · Doors', image: 'images/products/windsor-bifold-door-res-v2.jpg', desc: 'A high-performance bi-fold door system that stacks panels to fully open a wall. Creates a seamless connection between indoor and outdoor spaces, ideal for living areas and alfresco zones.', features: ['Multi-panel stacking bi-fold system','Full wall opening capability','Smooth top and bottom track operation','Double glazing compatible','Ideal for living areas and alfresco'] },
  'zeus-double-hung-window': { name: 'Zeus Double Hung Window', category: 'Residential · Double Hung Windows', image: 'images/products/zeus-double-hung-window-v2.jpg', desc: 'A timeless double hung window with two counterbalanced vertically sliding sashes. Provides flexible ventilation control and suits traditional and contemporary homes alike.', features: ['Two counterbalanced vertically sliding sashes','Upper and lower sash ventilation','Classic and contemporary aesthetic','Suitable for bedrooms and living areas','Flyscreen compatible'] },
  'apollo-sashless-frame': { name: 'Apollo Sashless Window Frame', category: 'Residential · Double Hung Windows', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/08/ZDH_Render-400x497.jpg', desc: 'An accessory frame compatible with sashless window units and louvres, providing design flexibility for unique residential applications without compromising on aesthetics.', features: ['Compatible with sashless window units','Louvre integration ready','Flexible design configurations','Clean minimalist aesthetic','Residential applications'] },
  'titan-apartment-door': { name: 'Titan Apartment Door', category: 'Commercial · Door Systems', image: 'images/products/titan-apartment-door-v2.jpg', desc: 'A commercial-grade apartment door system built for multi-storey residential and mixed-use developments. Engineered for durability, security, and compliance with commercial building standards.', features: ['Commercial-grade heavy-duty frames','Multi-point security locking','Compliant with commercial building codes','High-cycle durability','Suitable for apartments and mixed-use developments'] },
  'bif-titan-apartment-door-comm': { name: 'BIF Titan Apartment Door', category: 'Commercial · Door Systems', image: 'images/products/bif-titan-apartment-door-comm-v2.jpg', desc: 'A robust sliding apartment door system designed for high-traffic commercial and residential applications. Features reinforced frames and precision-engineered hardware for long-term reliability.', features: ['Heavy-duty reinforced sliding frames','Precision-engineered roller system','High-traffic durability','Multi-point locking','Suitable for commercial and residential apartments'] },
  'ultramax-apartment-door': { name: 'Ultramax Apartment Door', category: 'Commercial · Door Systems', image: 'images/products/ultramax-apartment-door-v2.jpg', desc: 'A premium apartment door system with a unique integrated support base designed to handle extreme glass weights. Perfect for high-end apartments requiring heavy double-glazed panels.', features: ['Integrated support base for extreme weights','Heavy double-glazed panel capacity','Premium finish quality','High-end apartment applications','Superior structural performance'] },
  'windsor-bifold-door-comm': { name: 'Windsor Bi-Fold Door', category: 'Commercial · Door Systems', image: 'images/products/windsor-bifold-door-comm-v2.jpg', desc: 'A commercial-grade bi-fold door system engineered for large openings in offices, retail, and hospitality environments. Smooth operation and robust construction for high-use applications.', features: ['Commercial-grade bi-fold construction','Large opening spans','High-cycle smooth operation','Suitable for offices, retail, and hospitality','Double glazing compatible'] },
  'hinge-door': { name: 'Hinge Door', category: 'Commercial · Door Systems', /* REPLACE (third party) */ image: 'https://www.isuperhouse.com/wp-content/uploads/2021/01/aluminium-hinged-door-1.jpg', desc: 'A versatile commercial hinge door system compatible with centre, front, and flush glazed suites. Wide range of stile, sill, and threshold options available to meet accessibility standards.', features: ['Compatible with glazed suite systems','Wide stile and sill options','Accessibility-compliant thresholds','French door configuration available','Deep pocket stiles for AS.1288 compliance'] },
  'top-hung-door': { name: 'Top Hung Door', category: 'Commercial · Door Systems', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/Screen-Shot-2024-09-07-at-11.24.13-AM.png', desc: 'A high-performing top-hung sliding door system ideal for schools, hospitals, and commercial spaces with strict no-trip-hazard requirements. No bottom track — perfect for high-traffic areas.', features: ['No bottom track — zero trip hazard','Soft close option available','Internal, external, and cavity applications','Easy adjustment options','Ideal for schools, hospitals, and commercial'] },
  'pivot-door': { name: 'Pivot Door', category: 'Commercial · Door Systems', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/0f850f3b349e3518e0241f3aedeed19e.jpg', desc: 'A striking commercial pivot door system providing a bold architectural statement. Designed for building entries, lobbies, and high-end commercial spaces where design impact is paramount.', features: ['Bold pivot door action','Architectural statement piece','Suitable for large and heavy panels','Building entries and lobby applications','Premium hardware options'] },
  '7635-sg': { name: '7635-SG Centre Glazed', category: 'Commercial · Centre Glazed Frames', image: 'images/products/7635-sg-v2.jpg', desc: 'A single-glazed centre glazed frame system for commercial applications requiring clean, minimal framing. Ideal for office partitions and internal glazing.', features: ['Single glazing','Minimal sightlines','Office partitions and internal glazing','Clean architectural aesthetic','Compliant with commercial standards'] },
  '10044-sg': { name: '10044-SG Centre Glazed', category: 'Commercial · Centre Glazed Frames', image: 'images/products/10044-sg-v2.jpg', desc: 'A larger single-glazed centre glazed frame system suited to commercial projects requiring wider sight lines and increased glass spans for open-plan office environments.', features: ['Wide sightline single glazing','Increased glass span capacity','Open-plan office applications','Structurally robust','Commercial building compliant'] },
  '15044-sg': { name: '15044-SG Centre Glazed', category: 'Commercial · Centre Glazed Frames', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/2e09fc1816e0a7e6909fa44069b588a7.jpg', desc: 'A heavy-duty single-glazed centre frame system for large commercial glazing applications. Provides maximum structural support for expansive glass installations.', features: ['Heavy-duty frame profiles','Maximum structural support','Large-span glass installations','Suitable for curtain wall integration','Commercial grade certified'] },
  '10044-dg': { name: '10044-DG Centre Glazed', category: 'Commercial · Centre Glazed Frames', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/21623fe59937217a4e32e361b4dad23d.jpg', desc: 'A double-glazed centre frame system offering enhanced acoustic and thermal performance. Suited to commercial environments requiring improved energy efficiency and noise reduction.', features: ['Double glazing for thermal performance','Enhanced acoustic insulation','Energy-efficient commercial spaces','Wide glass span support','Commercial building compliant'] },
  '10055-dg': { name: '10055-DG Centre Glazed', category: 'Commercial · Centre Glazed Frames', image: 'images/products/10055-dg-v2.jpg', desc: 'A premium double-glazed centre frame system with a deeper profile for superior insulation performance. Ideal for energy-conscious commercial developments.', features: ['Deep profile for superior insulation','Premium double glazing capacity','Maximum energy efficiency','Suitable for high-performance buildings','Commercial grade certified'] },
  'commercial-sliding-window': { name: 'Commercial Grade Sliding Window', category: 'Commercial · Ultramax Window Systems', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/7ca919576890d4deaffcc502f23dfbd6.jpg', desc: 'A heavy-duty commercial sliding window system engineered for apartment buildings, schools, offices, and large-scale developments requiring robust, high-performance glazing.', features: ['Heavy-duty commercial profiles','Large sash and frame sizes','High cycle durability','Double glazing compatible','Tested to commercial building standards'] },
  'commercial-awning-casement': { name: 'Commercial Grade Awning/Casement Window', category: 'Commercial · Ultramax Window Systems', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/444cad1a0c738e89866fb7819b1fe1da.jpg', desc: 'A commercial-grade awning and casement window system capable of handling large sash sizes with precision Truth hardware. Perfect for high-end residential and commercial applications.', features: ['Truth hardware for large sash sizes','Traditional flyscreen compatible','High-end residential and commercial','Large glass opening capacity','Contact us for latest Ultramax Plus version'] },
  'commercial-double-hung': { name: 'Commercial Grade Counterbalanced Double Hung Window', category: 'Commercial · Ultramax Window Systems', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/8dd3f038ef568cc055d881ded5ee8abe.jpg', desc: 'A commercial-grade counterbalanced double hung window offering smooth sash operation in both directions. Suitable for apartments, hotels, and multi-storey commercial buildings.', features: ['Counterbalanced dual sash operation','Commercial-grade heavy profiles','Hotels and apartment applications','Double glazing compatible','Multi-storey building certified'] },
  'alubreak-awning': { name: 'AluBREAK-COMM Awning / Fixed Window', category: 'Thermal Break · AluBREAK-COMM', image: 'images/products/alubreak-awning-v2.jpg', desc: 'A thermally broken awning and fixed window system that significantly reduces heat transfer between inside and outside. Engineered for energy-efficient commercial and high-end residential projects.', features: ['Thermally broken aluminium profiles','Significantly reduced heat transfer','Energy-efficient performance','Fixed and awning configurations','Suitable for commercial and high-end residential'] },
  'alubreak-sliding': { name: 'AluBREAK-COMM Sliding / Stacker Door', category: 'Thermal Break · AluBREAK-COMM', image: 'images/products/alubreak-sliding-v2.jpg', desc: 'A thermally broken sliding and stacker door system delivering superior insulation performance. Ideal for climate-conscious developments requiring maximum energy efficiency without sacrificing design.', features: ['Thermally broken sliding and stacking door','Superior insulation performance','Energy rating compliant','Large panel configurations','Climate-conscious developments'] },
  'alubreak-hinge': { name: 'AluBREAK-COMM Hinge Door', category: 'Thermal Break · AluBREAK-COMM', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/02/9.jpg', desc: 'A thermally broken hinge door system combining excellent thermal performance with commercial-grade strength. Perfect for energy-rated buildings and projects requiring compliance with strict thermal regulations.', features: ['Thermally broken hinge door','Commercial-grade structural strength','Compliant with thermal regulations','Energy-rated building suitable','Multiple configuration options'] },
  'security-profiles': { name: 'Security Profiles', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/04/DF7-600x400.png', desc: 'Heavy-duty aluminium security screen profiles engineered to complement DH Aluminium window and door systems. Designed to provide maximum protection without compromising on aesthetics.', features: ['Heavy-duty aluminium construction','Complements DH Aluminium systems','Maximum intrusion protection','Sleek, unobtrusive design','Multiple finish options'] },
  'fibreglass-flyscreen': { name: 'Fibreglass Flyscreen Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/fibreglass-flywire-mesh.jpg', desc: 'A lightweight and flexible fibreglass flyscreen mesh offering excellent insect protection with good airflow and visibility. A cost-effective solution for standard residential and commercial applications.', features: ['Lightweight and flexible','Excellent insect protection','Good airflow and visibility','Cost-effective solution','Residential and commercial applications'] },
  'aluminium-flyscreen': { name: 'Aluminium Flyscreen Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/aluminium-fly-screen-mesh-500x500-1.jpg', desc: 'A durable aluminium flyscreen mesh providing a stronger alternative to fibreglass. Resistant to corrosion and suitable for environments requiring enhanced durability and longevity.', features: ['Stronger than fibreglass mesh','Corrosion-resistant','Extended lifespan','Suitable for coastal environments','Residential and commercial applications'] },
  'ss-flyscreen': { name: 'Stainless Steel Flyscreen Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/stainless-steel-flyscreen-mesh-600x600.jpg', desc: 'A premium stainless steel flyscreen mesh combining insect protection with enhanced security. Corrosion-resistant and ideal for coastal properties and high-end residential applications.', features: ['Premium stainless steel construction','Insect protection with added security','Highly corrosion-resistant','Ideal for coastal properties','High-end residential applications'] },
  'ss-security-mesh': { name: 'Stainless Steel Security Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/stainless-steel-mesh-Copy.jpg', desc: 'A high-tensile stainless steel security mesh offering superior intrusion resistance. Tested to rigorous security standards, providing peace of mind for homes and commercial properties.', features: ['High-tensile stainless steel','Superior intrusion resistance','Tested to rigorous security standards','Residential and commercial applications','Corrosion-resistant finish'] },
  'pet-mesh': { name: 'Pet Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/pet-mesh-square.jpg', desc: 'A heavy-duty pet-resistant mesh designed to withstand scratching and impact from pets. Maintains full flyscreen functionality while providing a durable barrier suitable for households with animals.', features: ['Heavy-duty pet-resistant construction','Withstands scratching and impact','Full flyscreen functionality maintained','Suitable for all pet sizes','Residential applications'] },
  'perforated-mesh': { name: 'Perforated Mesh', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/Perforated-Mesh.jpg', desc: 'A perforated aluminium mesh panel offering privacy, shade, and ventilation control. Available in various perforation patterns to suit architectural screening and decorative applications.', features: ['Privacy and shade control','Ventilation management','Multiple perforation patterns','Architectural and decorative applications','Powder coat colour options'] },
  'vision-guard': { name: 'Vision Guard', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/vision-guard-600x600.jpg', desc: 'A premium security screen system providing strong protection with minimal visual obstruction. Engineered for homes and commercial spaces where security and clear sightlines are both essential.', features: ['Strong security protection','Minimal visual obstruction','Clear sightlines maintained','Residential and commercial applications','Premium finish options'] },
  'diamond-grilles': { name: 'Diamond Grilles', category: 'Security · AluSHIELD', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/03/Diamond-Grill.jpg', desc: 'Decorative aluminium diamond grilles combining traditional security with architectural charm. A timeless design that enhances kerb appeal while providing a physical security barrier.', features: ['Classic diamond grille pattern','Traditional security barrier','Enhances architectural kerb appeal','Powder coat colours available','Residential applications'] },
  'nova-wall-battens': { name: 'Nova Wall Battens', category: 'Architectural · AluSPAN', image: 'images/products/nova-wall-battens-v2.png', desc: 'Precision-extruded aluminium wall batten profiles for contemporary cladding and feature wall applications. Available in a range of sizes and finishes to suit any architectural design intent.', features: ['Precision-extruded aluminium profiles','Contemporary cladding applications','Multiple sizes available','Wide range of powder coat finishes','Residential and commercial use'] },
  'strata-battens': { name: 'Strata Battens System', category: 'Architectural · AluSPAN', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/05/ad07dc2beb054e5a070daf1dfff5f570-scaled.jpeg', desc: 'A complete wall batten system including profiles, fixings, and accessories for straightforward installation. Designed for residential and commercial feature walls, facades, and screening applications.', features: ['Complete system including fixings','Straightforward installation','Feature walls and facade applications','Residential and commercial suitable','Multiple finish options'] },
  'louvre-profiles': { name: 'Louvre Profiles', category: 'Architectural · AluSPAN', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/05/04bcfdb35e8d4b41f751f57477905068.jpeg', desc: 'High-quality aluminium louvre blade profiles providing adjustable ventilation, shade, and privacy. Suitable for pergolas, facades, fencing, and architectural screening in residential and commercial settings.', features: ['Adjustable ventilation control','Shade and privacy management','Pergola and facade applications','Residential and commercial use','Multiple blade sizes and finishes'] },
  'privacy-screening': { name: 'Privacy Screening', category: 'Architectural · AluSPAN', image: 'images/products/privacy-screening-v2.png', desc: 'Architectural aluminium privacy screening solutions for balconies, courtyards, and outdoor areas. Combining function and aesthetics, these screens provide privacy without sacrificing natural light or airflow.', features: ['Balcony and courtyard screening','Natural light and airflow maintained','Architectural aesthetic appeal','Custom sizing available','Powder coat colour options'] },
  'post-rail-fencing': { name: 'Post and Rail Fencing', category: 'Architectural · AluSPAN', image: 'https://conceptaluminium.com.au/wp-content/uploads/2025/07/Post-and-rail-fence.jpg', desc: 'Durable aluminium post and rail fencing systems for residential and commercial properties. Low maintenance, corrosion-resistant, and available in a range of powder coat colours to suit any setting.', features: ['Low maintenance aluminium construction','Corrosion-resistant','Wide colour range available','Residential and commercial applications','Long-term durability'] },
  'alufold': { name: 'AluFOLD', category: 'Architectural · AluSPAN', image: 'https://conceptaluminium.com.au/wp-content/uploads/2026/02/AluFOLD-1.png', desc: 'A versatile aluminium folding system for internal and external applications. Engineered for a smooth, controlled folding action, suitable for partitions, room dividers, and multi-use spaces.', features: ['Smooth controlled folding action','Internal and external applications','Room dividers and partitions','Multi-use space flexibility','Residential and commercial suitable'] },
  'geometrics': { name: 'Geometrics', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/05/e7b48772bfdba7baa79a10d20477a42b-600x450.jpeg', desc: 'An extensive range of aluminium geometric shapes in various finishes, including angles, flat bars, square hollow sections, rectangular hollow sections, and channels for diverse fabrication requirements.', features: ['Angles, flat bars, and channels','Square and rectangular hollow sections','Multiple alloy grades available','Various surface finishes','Fabrication and construction applications'] },
  'sheet-alloy': { name: 'Sheet Alloy & Tread Plates', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/07/7d734320fbecb493317d27dc8864ddde-1-600x400.jpg', desc: 'High-quality aluminium sheet alloy and tread plate products for fabrication, cladding, and industrial applications. Available in multiple thicknesses and finishes to meet specific project requirements.', features: ['Multiple thickness options','Sheet alloy for fabrication and cladding','Tread plates for anti-slip applications','Various surface finishes','Industrial and construction use'] },
  'windsor-bifold-hardware': { name: 'Windsor Bi-Fold Hardware', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/07/250mm-FLUSH-BOLT-WITH-ROUND-TIP-600x600.png', desc: 'Precision-engineered hardware components specifically designed for Windsor Bi-Fold door systems. Includes tracks, pivots, and folding carriages for smooth, reliable bi-fold door operation.', features: ['Precision-engineered components','Tracks, pivots, and folding carriages','Smooth and reliable operation','Compatible with Windsor Bi-Fold systems','Durable long-life construction'] },
  'apartment-door-hardware': { name: 'Apartment Door Hardware', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/YARRA-VIEW-600x554.jpg', desc: 'A complete range of hardware components for apartment door systems, including handles, locks, hinges, and closing mechanisms engineered to meet commercial building code requirements.', features: ['Handles, locks, and hinges','Commercial building code compliant','Closing mechanisms included','High-cycle durability','Residential and commercial apartment use'] },
  'evolution-locks': { name: 'Evolution Sliding Door Locks', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/c4798220054e38fe3a30f67ca4b6a3ca-600x538.jpg', desc: 'High-security multi-point locking systems for sliding doors. Engineered to provide superior security and smooth operation, suitable for both residential and commercial sliding door installations.', features: ['Multi-point high-security locking','Smooth operation mechanism','Residential and commercial suitable','Compatible with DH Aluminium sliding door systems','Durable long-life construction'] },
  'glazing-accessories': { name: 'Glazing Wedges & Woolpile', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/11/Flexible_plastic_prods-600x225.jpg', desc: 'Essential glazing accessories including wedge gaskets and wool pile weather seals, designed to complement DH Aluminium window and door systems for a secure, weatherproof finish.', features: ['Glazing wedge gaskets','Wool pile weather seals','Compatible with DH Aluminium systems','Weatherproof performance','Residential and commercial applications'] },
  'rollers-locks': { name: 'Rollers & Edge Hinge Door Locks', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/05/a70ce21b8ac6e2064feaefcf5ee23c01-600x193.jpeg', desc: 'Precision-engineered rollers for smooth sliding window and door operation, plus edge hinge door locking mechanisms providing reliable security for hinged aluminium door systems.', features: ['Precision-engineered rollers','Smooth sliding operation','Edge hinge door locking','Reliable security performance','Compatible with DH Aluminium systems'] },
  'corner-joining-plates': { name: 'Corner Joining Plates', category: 'Hardware & Accessories', image: 'https://conceptaluminium.com.au/wp-content/uploads/2024/09/089664a875fb7419e401ffe68ceed7a8-600x552.jpg', desc: 'Heavy-duty aluminium corner joining plates for fabricating strong, precise frame corners in window and door systems. Ensures structural integrity and dimensional accuracy in finished assemblies.', features: ['Heavy-duty aluminium construction','Precise frame corner fabrication','Structural integrity assured','Dimensional accuracy','Compatible with all DH Aluminium frame systems'] }
};

// Reverse lookup
const NAME_TO_KEY = {};
Object.entries(PRODUCTS).forEach(([key, p]) => {
  NAME_TO_KEY[p.name.toLowerCase().trim()] = key;
});

// Open product detail
let lastFocused = null;

function openProduct(name, trigger) {
  lastFocused = trigger || document.activeElement;
  const key = NAME_TO_KEY[name.toLowerCase().trim()];
  if (!key) return;
  const p = PRODUCTS[key];
  document.getElementById('pd-category').textContent = p.category;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-desc').textContent = p.desc;
  document.getElementById('pd-features').innerHTML = p.features.map(f => '<div class="pd-feature">' + f + '</div>').join('');
  const img = document.getElementById('pd-img');
  const placeholder = document.getElementById('pd-placeholder');
  if (p.image) {
    img.src = p.image;
    img.alt = p.name;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    // Also update card image if present
    const cardImgKey = p.name.toLowerCase().trim().replace(/ /g,'-').replace(/\//g,'').replace(/--/g,'-');
    const cardImgDiv = document.getElementById('card-img-' + cardImgKey);
    if (cardImgDiv) {
      cardImgDiv.innerHTML = '<img src="' + p.image + '" alt="' + p.name + '"/>';
    }
  } else {
    img.style.display = 'none';
    img.src = '';
    placeholder.style.display = 'flex';
  }
  const overlay = document.getElementById('product-detail');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.pd-back')?.focus();
}

function closeProduct() {
  const overlay = document.getElementById('product-detail');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Send focus back to the card that opened it
  if (lastFocused) { lastFocused.focus(); lastFocused = null; }
}

document.querySelectorAll('[data-close-product]').forEach(function (el) {
  el.addEventListener('click', closeProduct);
});

/* ── Product cards ──
   These are divs, so they need an explicit role, a tab stop and
   keyboard handling to be usable without a mouse. */
document.querySelectorAll('.product-card').forEach(card => {
  const name = card.querySelector('.product-name')?.textContent?.trim();
  if (!name) return;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'View details for ' + name);
  card.addEventListener('click', () => openProduct(name, card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProduct(name, card);
    }
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('product-detail').classList.contains('open')) {
    closeProduct();
  }
});
// Update card images from PRODUCTS data on load
function updateCardImages() {
  Object.entries(PRODUCTS).forEach(([key, p]) => {
    if (p.image) {
      const keyId = 'card-img-' + key;
      const nameId = 'card-img-' + p.name.toLowerCase().trim().replace(/ /g,'-').replace(/[/]/g,'').replace(/--/g,'-');
      const cardImgDiv = document.getElementById(keyId) || document.getElementById(nameId);
      if (cardImgDiv) {
        cardImgDiv.innerHTML = '<img src="' + p.image + '" alt="' + p.name + '" style="width:100%;height:100%;object-fit:cover;"/>';
      }
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCardImages);
} else {
  updateCardImages();
}
