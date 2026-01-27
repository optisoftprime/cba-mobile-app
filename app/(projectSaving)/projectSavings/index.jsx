// screens/ProjectSavingsList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';

export default function ProjectSavingsList() {
  const projects = [
    {
      id: 1,
      projectName: 'New Laptop',
      targetAmount: '₦250,000',
      targetDate: '23/09/2025',
      contributionAmount: '₦100,000',
      status: 'Active',
      progress: 65,
    },
    {
      id: 2,
      projectName: 'New Laptop',
      targetAmount: '₦250,000',
      targetDate: '23/09/2025',
      contributionAmount: '₦100,000',
      status: 'Active',
      progress: 65,
    },
    {
      id: 3,
      projectName: 'New Laptop',
      targetAmount: '₦250,000',
      targetDate: '23/09/2025',
      contributionAmount: '₦100,000',
      status: 'Active',
      progress: 65,
    },
  ];

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
  };

  const handleCreateNewProject = () => {
    console.log('Create New Project Savings pressed');
    navigateTo('projectSavingsForm');
  };

  const handleViewDetails = (projectId) => {
    // console.log('View details for project:', projectId);
    // navigateTo('loans');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Project Savings"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Project Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#D97706"
          topRightText="Withdraw"
          topRightAction={handleWithdraw}
          topRightIcon="account-balance-wallet"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={true}
          containerClassName="mx-5 mb-8"
        />
        <View className="px-4">
          {/* Wallet Card with Withdraw Button */}

          {/* Create New Project Savings Button */}
          <TouchableOpacity onPress={handleCreateNewProject} className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold" style={{color:Colors?.primary}}>Create New Project Savings</Text>
          </TouchableOpacity>

          {/* Projects List */}
          {projects.map((project) => (
            <View
              key={project.id}
              className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Tree Image */}
                <View className="mr-4 h-28 w-28 items-center justify-center overflow-hidden rounded-xl">
                  <Image
                    source={require('../../../assets/image 51.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Project Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Project Name: </Text>
                    {project.projectName}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Target Amount: </Text>
                    {project.targetAmount}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Target Date: </Text>
                    {project.targetDate}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Contribution Amount: </Text>
                    {project.contributionAmount}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{project.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full"
                      style={{ width: `${project.progress}%`, backgroundColor: Colors?.primary }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {project.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(project.id)}
                    className="items-center rounded-lg py-2"
                    style={{ backgroundColor: Colors?.primary }}>
                    <Text className="text-xs font-semibold text-white">View Savings Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
