import {
  Car, Bike, Zap, Cog, CircleDot, Building, Home, Key, LandPlot, HardHat, Store, BedDouble,
  Tv, UtensilsCrossed, Laptop, Camera, Gamepad2, Thermometer, Keyboard, HardDrive, Wind, WashingMachine,
  Smartphone, Watch, Tablet,
  Truck, Package,
  Briefcase, BarChart3, Headphones, Navigation, UserCheck, Send, GraduationCap, ChefHat, ConciergeBell, Wrench, Code, Plane, Calculator, Warehouse, Palette, Shield, MoreHorizontal,
  Sofa, Bed, Flower2, Baby, Box,
  Shirt, User, Users,
  Fish, Bone, Dog, PawPrint,
  BookOpen, Dumbbell, Music, Trophy, Puzzle,
  School, Map, Settings, Heart, Hammer, Bug, Scale, PackageCheck, HelpCircle,
  type LucideIcon
} from 'lucide-react';

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: LucideIcon;
  subs: SubCategory[];
}

export const categories: Category[] = [
  {
    name: 'Cars',
    slug: 'cars',
    icon: Car,
    subs: [
      { name: 'Cars', slug: 'cars' },
      { name: 'Bikes', slug: 'bikes' },
      { name: 'Motorcycles', slug: 'motorcycles' },
      { name: 'Scooters', slug: 'scooters' },
      { name: 'Spare Parts', slug: 'spare-parts' },
      { name: 'Bicycles', slug: 'bicycles' },
    ],
  },
  {
    name: 'Properties',
    slug: 'properties',
    icon: Building,
    subs: [
      { name: 'For Sale: Houses & Apartments', slug: 'houses-for-sale' },
      { name: 'For Rent: Houses & Apartments', slug: 'houses-for-rent' },
      { name: 'Lands & Plots', slug: 'lands-plots' },
      { name: 'New Projects', slug: 'new-projects' },
      { name: 'For Rent: Shops & Offices', slug: 'shops-for-rent' },
      { name: 'For Sale: Shops & Offices', slug: 'shops-for-sale' },
      { name: 'PG & Guest Houses', slug: 'pg-guest-houses' },
    ],
  },
  {
    name: 'Electronics & Appliances',
    slug: 'electronics',
    icon: Tv,
    subs: [
      { name: 'TVs, Video - Audio', slug: 'tvs-video-audio' },
      { name: 'Kitchen & Other Appliances', slug: 'kitchen-appliances' },
      { name: 'Computers & Laptops', slug: 'computers-laptops' },
      { name: 'Cameras & Lenses', slug: 'cameras-lenses' },
      { name: 'Games & Entertainment', slug: 'games-entertainment' },
      { name: 'Fridges', slug: 'fridges' },
      { name: 'Computer Accessories', slug: 'computer-accessories' },
      { name: 'Hard Disks, Printers & Monitors', slug: 'hard-disks-printers' },
      { name: 'ACs', slug: 'acs' },
      { name: 'Washing Machines', slug: 'washing-machines' },
    ],
  },
  {
    name: 'Mobiles',
    slug: 'mobiles',
    icon: Smartphone,
    subs: [
      { name: 'Mobile Phones', slug: 'mobile-phones' },
      { name: 'Accessories', slug: 'mobile-accessories' },
      { name: 'Tablets', slug: 'tablets' },
    ],
  },
  {
    name: 'Commercial Vehicles & Spares',
    slug: 'commercial-vehicles',
    icon: Truck,
    subs: [
      { name: 'Commercial & Other Vehicles', slug: 'commercial-vehicles' },
      { name: 'Spare Parts', slug: 'commercial-spare-parts' },
    ],
  },
  {
    name: 'Jobs',
    slug: 'jobs',
    icon: Briefcase,
    subs: [
      { name: 'Data entry & Back office', slug: 'data-entry' },
      { name: 'Sales & Marketing', slug: 'sales-marketing' },
      { name: 'BPO & Telecaller', slug: 'bpo-telecaller' },
      { name: 'Driver', slug: 'driver' },
      { name: 'Office Assistant', slug: 'office-assistant' },
      { name: 'Delivery & Collection', slug: 'delivery-collection' },
      { name: 'Teacher', slug: 'teacher' },
      { name: 'Cook', slug: 'cook' },
      { name: 'Receptionist & Front office', slug: 'receptionist' },
      { name: 'Operator & Technician', slug: 'operator-technician' },
      { name: 'IT Engineer & Developer', slug: 'it-engineer' },
      { name: 'Hotel & Travel Executive', slug: 'hotel-travel' },
      { name: 'Accountant', slug: 'accountant' },
      { name: 'Warehouse Staff', slug: 'warehouse' },
      { name: 'Designer', slug: 'designer' },
      { name: 'Security Guards', slug: 'security-guards' },
      { name: 'Other Jobs', slug: 'other-jobs' },
    ],
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    icon: Sofa,
    subs: [
      { name: 'Sofa & Dining', slug: 'sofa-dining' },
      { name: 'Beds & Wardrobes', slug: 'beds-wardrobes' },
      { name: 'Home Decor & Garden', slug: 'home-decor' },
      { name: 'Kids Furniture', slug: 'kids-furniture' },
      { name: 'Other Household Items', slug: 'other-household' },
    ],
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    icon: Shirt,
    subs: [
      { name: 'Men', slug: 'men' },
      { name: 'Women', slug: 'women' },
      { name: 'Kids', slug: 'kids' },
    ],
  },
  {
    name: 'Pets',
    slug: 'pets',
    icon: PawPrint,
    subs: [
      { name: 'Fishes & Aquarium', slug: 'fishes-aquarium' },
      { name: 'Pet Food & Accessories', slug: 'pet-food-accessories' },
      { name: 'Dogs', slug: 'dogs' },
      { name: 'Other Pets', slug: 'other-pets' },
    ],
  },
  {
    name: 'Books, Sports & Hobbies',
    slug: 'books-sports',
    icon: BookOpen,
    subs: [
      { name: 'Books', slug: 'books' },
      { name: 'Gym & Fitness', slug: 'gym-fitness' },
      { name: 'Musical Instruments', slug: 'musical-instruments' },
      { name: 'Sports Equipment', slug: 'sports-equipment' },
      { name: 'Other Hobbies', slug: 'other-hobbies' },
    ],
  },
  {
    name: 'Services',
    slug: 'services',
    icon: Settings,
    subs: [
      { name: 'Education & Classes', slug: 'education-classes' },
      { name: 'Tours & Travel', slug: 'tours-travel' },
      { name: 'Electronics Repair & Services', slug: 'electronics-repair' },
      { name: 'Health & Beauty', slug: 'health-beauty' },
      { name: 'Home Renovation & Repair', slug: 'home-renovation' },
      { name: 'Cleaning & Pest Control', slug: 'cleaning-pest-control' },
      { name: 'Legal & Documentation Services', slug: 'legal-documentation' },
      { name: 'Packers & Movers', slug: 'packers-movers' },
      { name: 'Other Services', slug: 'other-services' },
    ],
  },
];

/** Flat list of top-level category names for dropdowns */
export const categoryNames = categories.map((c) => c.name);

/** Get subcategories for a given top-level slug */
export const getSubcategories = (slug: string) =>
  categories.find((c) => c.slug === slug)?.subs ?? [];
