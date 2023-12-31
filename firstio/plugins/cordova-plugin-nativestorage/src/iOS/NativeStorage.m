#import "NativeStorage.h"
#import <Cordova/CDVPlugin.h>

@implementation NativeStorage

- (void) remove: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];

		if(reference!=nil)
		{
			NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
			[defaults removeObjectForKey: reference];
			BOOL success = [defaults synchronize];
			if(success) pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK];
			else pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Remove has failed"];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}

- (void) putBoolean: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];
		BOOL aBoolean = [command.arguments objectAtIndex:1];

		if(reference!=nil)
		{
			NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
			[defaults setBool: aBoolean forKey:reference];
			BOOL success = [defaults synchronize];
			if(success) pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsBool:aBoolean];
			else pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Write has failed"];		
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}
- (void) getBoolean: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];

		if(reference!=nil)
		{
			BOOL aBoolean = [[NSUserDefaults standardUserDefaults] boolForKey:reference];
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsBool:aBoolean];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}

- (void) putInt: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];
		int anInt = [[command.arguments objectAtIndex:1] integerValue];

		if(reference!=nil)
		{
			NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
			[defaults setInteger: anInt forKey:reference];
			BOOL success = [defaults synchronize];
			if(success) pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsInt:anInt];
			else pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Write has failed"];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}
- (void) getInt: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];

		if(reference!=nil)
		{
			int anInt = [[NSUserDefaults standardUserDefaults] integerForKey:reference];
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsInt:anInt];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}


- (void) putDouble: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];
		double aDouble = [[command.arguments objectAtIndex:1] doubleValue];

		if(reference!=nil)
		{
			NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
			[defaults setDouble: aDouble forKey:reference];
			BOOL success = [defaults synchronize];
			if(success) pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsDouble:aDouble];
			else pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Write has failed"];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}
- (void) getDouble: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];

		if(reference!=nil)
		{
			double aDouble = [[NSUserDefaults standardUserDefaults] doubleForKey:reference];
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsDouble:aDouble];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}

- (void) putString: (CDVInvokedUrlCommand*) command
{
	[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];
		NSString* aString = [command.arguments objectAtIndex:1];

		if(reference!=nil)
		{
			NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
			[defaults setObject: aString forKey:reference];
			BOOL success = [defaults synchronize];
			if(success) pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString:aString];
			else pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Write has failed"];
		
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}
- (void) getString: (CDVInvokedUrlCommand*) command
{
		[self.commandDelegate runInBackground:^{
		CDVPluginResult* pluginResult = nil;
		NSString* reference = [command.arguments objectAtIndex:0];

		if(reference!=nil)
		{
			NSString* aString = [[NSUserDefaults standardUserDefaults] stringForKey:reference];
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString:aString];
		}
		else
		{
			pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString:@"Reference was null"];
		}
		[self.commandDelegate sendPluginResult:pluginResult callbackId: command.callbackId];
	}];
}

@end