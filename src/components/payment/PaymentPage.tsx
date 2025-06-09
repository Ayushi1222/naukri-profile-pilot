
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Star, Shield, Clock, ArrowLeft, CreditCard } from "lucide-react";

interface PaymentPageProps {
  onBack: () => void;
  user: any;
}

export const PaymentPage = ({ onBack, user }: PaymentPageProps) => {
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (method: 'upi' | 'card') => {
    setIsProcessing(true);
    
    // Simulate payment redirect
    setTimeout(() => {
      if (method === 'upi') {
        // UPI payment redirect
        window.open(`upi://pay?pa=merchant@paytm&pn=Naukri%20Profile%20Updater&am=99&cu=INR&tn=Automation%20Service%20Payment`, '_blank');
      } else {
        // Razorpay redirect (demo URL)
        window.open('https://razorpay.com/payment-link/demo', '_blank');
      }
      setIsProcessing(false);
    }, 1000);
  };

  const features = [
    "24/7 Automatic profile updates",
    "Smart skill reordering",
    "Profile summary optimization",
    "Activity tracking & analytics",
    "Email notifications",
    "Priority customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Service Details */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Premium Automation Service
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-green-600">₹99</span>
                  <Badge className="bg-red-500 text-white">Limited Time</Badge>
                </div>
                <p className="text-gray-600 mt-2">One-time payment • Lifetime access</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Why choose our service?</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Keep your Naukri profile active and visible to recruiters 24/7. 
                    Our automation ensures you never miss opportunities while you focus on what matters most.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Options */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 text-center">
                  Choose Payment Method
                </CardTitle>
                <p className="text-gray-600 text-center text-sm">
                  Secure payment powered by trusted providers
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* UPI Payment */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'upi' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('upi')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">UPI</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">UPI Payment</h3>
                        <p className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Instant
                    </Badge>
                  </div>
                </div>

                {/* Card Payment */}
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPayment === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Card Payment</h3>
                        <p className="text-sm text-gray-600">Credit/Debit Card, Net Banking</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      Secure
                    </Badge>
                  </div>
                </div>

                <Button 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => selectedPayment && handlePayment(selectedPayment)}
                  disabled={!selectedPayment || isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹99 ${selectedPayment === 'upi' ? 'via UPI' : 'via Card'}`
                  )}
                </Button>

                <div className="text-center text-xs text-gray-500 mt-4">
                  <p>🔒 Your payment is secured with industry-standard encryption</p>
                  <p className="mt-1">By proceeding, you agree to our Terms of Service</p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">1000+</div>
                    <div className="text-xs text-gray-600">Happy Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
