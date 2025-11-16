import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import useGoogleSignIn from "../../lib/integration/google-signIn-hook";
import { on } from "events";

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  university: string;
  program: string;
  graduationYear: string;
  dateOfBirth?: Date;
  gender?: string;
  city: string;
  country: string;
}

const RegistrationForm = ({
  onClickSignUp,
}: {
  onClickSignUp: (formData: FormData, googleToken: string) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    university: "",
    program: "",
    graduationYear: "",
    city: "",
    country: "",
  });
  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleCredentialResponse = (response: any) => {
    onClickSignUp(formDataRef.current, response.credential);
  };

  useEffect(() => {
    const g = (window as any).google;
    if (!g?.accounts?.id) return;

    g.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });

    g.accounts.id.renderButton(document.getElementById("googleSignInDiv")!, {
      theme: "outline",
      size: "large",
    });
  }, []);

  useEffect(() => {
    const mandatoryFieldsFilled =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.university.trim() !== "" &&
      formData.program.trim() !== "" &&
      formData.graduationYear.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.country.trim() !== "";

    setIsFormValid(mandatoryFieldsFilled);
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );

  return (
    <div className="relative mt-4 md:min-w-[768px] md:px-20  lg:min-w-[1440px] lg:px-80 min-w-[360px]">
      <Card className="w-full  h-full shadow-lg">
        {/* <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Student Registration
          </CardTitle>
          <CardDescription className="text-base">
            Complete your profile to create an account
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <form className="space-y-6 mt-6 ">
            {/* Personal Information Section */}
            <div className="">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.dateOfBirth && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBirth
                            ? format(formData.dateOfBirth, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth}
                          onSelect={(date) =>
                            setFormData((prev) => ({
                              ...prev,
                              dateOfBirth: date,
                            }))
                          }
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={1950}
                          toYear={currentYear}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg mt-8 font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="country"
                      placeholder="Enter your country"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg mt-8 font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Academic Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="university">
                    University <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="university"
                    placeholder="Enter your university name"
                    value={formData.university}
                    onChange={(e) =>
                      handleInputChange("university", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">
                      Program of Study{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="program"
                      placeholder="e.g., Computer Science"
                      value={formData.program}
                      onChange={(e) =>
                        handleInputChange("program", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">
                      Expected Graduation Year{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.graduationYear}
                      onValueChange={(value) =>
                        handleInputChange("graduationYear", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {graduationYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <div className="pt-4">
              <Button
                type="button"
                // onClick={googleSignIn}
                disabled={!isFormValid}
                className="relative w-full h-12 text-base font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                size="lg"
              >
                <div
                  className="inset-0 absolute opacity-0"
                  id="googleSignInDiv"
                ></div>
                {/* Visible Custom UI */}
                <svg
                  className="mr-2 h-5 w-5 pointer-events-none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>

                <span className="pointer-events-none">
                  {isFormValid
                    ? "Continue with Google"
                    : "Fill all required fields to continue"}
                </span>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By registering, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
